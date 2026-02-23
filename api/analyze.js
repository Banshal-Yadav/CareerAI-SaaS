import { GoogleGenerativeAI } from "@google/generative-ai";
import admin from 'firebase-admin';

export const config = {
  maxDuration: 60,
};

const DEV_ORIGINS = process.env.NODE_ENV === 'development'
  ? ['http://localhost:5173', 'http://localhost:3000']
  : [];

const ALLOWED_ORIGINS = [
  ...(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  ...DEV_ORIGINS,
];

const sanitizeInput = (input, maxLength = 500) => {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)
    .replace(/[<>{}]/g, '')
    .trim();
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const host = req.headers.host;
  const forwardedProto = req.headers['x-forwarded-proto'];
  const proto = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || 'https';
  const selfOrigin = host ? `${proto}://${host}` : null;
  const isAllowedOrigin =
    !origin ||
    (selfOrigin != null && origin === selfOrigin) ||
    ALLOWED_ORIGINS.includes(origin);

  res.setHeader('Access-Control-Allow-Credentials', true);
  if (origin && isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin && selfOrigin) {
    // Some environments omit the Origin header; allow same-origin by default.
    res.setHeader('Access-Control-Allow-Origin', selfOrigin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(isAllowedOrigin ? 200 : 403).end();
    return;
  }

  if (!isAllowedOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server API Key missing' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    let uid;
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      uid = decodedToken.uid;
    } catch (authError) {
      console.error('Token verification failed:', authError);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    const FREE_TIER_LIMITS = {
      maxAssessments: 10,
      maxBookmarks: 3,
      dailyAssessments: 3
    };

    let isPro = false;

    try {
      const db = admin.firestore();
      const profileRef = db.collection('profiles').doc(uid);
      const docSnap = await profileRef.get();

      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      let profileData = docSnap.exists ? docSnap.data() : { assessments: [], bookmarks: [], resumes: [], isPro: false, dailyCreations: [] };
      isPro = profileData.isPro === true;

      if (!isPro) {
        const dailyCreations = profileData.dailyCreations || [];
        const recentCreations = dailyCreations.filter(timestamp => {
          const createdAt = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
          return createdAt > twentyFourHoursAgo;
        });

        if (recentCreations.length >= FREE_TIER_LIMITS.dailyAssessments) {
          return res.status(429).json({
            error: 'Daily limit reached. You can only generate 3 assessments per 24 hours.',
            limitType: 'daily'
          });
        }
      }

      if (!isPro && profileData.assessments && Array.isArray(profileData.assessments)) {

        if (profileData.assessments.length >= FREE_TIER_LIMITS.maxAssessments) {
          const bookmarkedIds = (profileData.bookmarks || []).map(b => b.assessmentId);
          const nonBookmarked = profileData.assessments.filter(a => !bookmarkedIds.includes(a.assessmentId));

          if (nonBookmarked.length === 0) {
            return res.status(429).json({
              error: 'Storage limit reached. All your assessments are bookmarked. Delete some assessments or upgrade to Pro for unlimited storage.',
              limitType: 'storage'
            });
          }

          nonBookmarked.sort((a, b) => {
            const aTime = a.createdAt?.seconds || 0;
            const bTime = b.createdAt?.seconds || 0;
            return aTime - bTime;
          });
          const oldestToDelete = nonBookmarked[0];

          const updatedAssessments = profileData.assessments.filter(
            a => a.assessmentId !== oldestToDelete.assessmentId
          );
          await profileRef.update({ assessments: updatedAssessments });
        }
      }
    } catch (dbError) {
      console.error('Error checking usage limit:', dbError);
      return res.status(500).json({ error: 'Failed to verify usage limits' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const { matchedSkills, interests, persona, experience } = req.body;

    if (!matchedSkills || !Array.isArray(matchedSkills) || matchedSkills.length > 50) {
      return res.status(400).json({ error: 'Invalid skills data' });
    }
    // Validate each skill is a string and reasonable length
    if (!matchedSkills.every(s => typeof s === 'string' && s.length < 100)) {
      return res.status(400).json({ error: 'Invalid skill format' });
    }

    if (!interests || typeof interests !== 'string' || interests.length > 500) {
      return res.status(400).json({ error: 'Interests too long (max 500 chars)' });
    }
    if (persona === 'jobSeeker' && (!experience || experience.length > 100)) {
      return res.status(400).json({ error: 'Invalid experience data' });
    }

    const safeInterests = sanitizeInput(interests, 500);
    const safeExperience = sanitizeInput(experience || '', 100);
    const safeSkills = matchedSkills.map(s => sanitizeInput(s, 50)); // Double sanitize
    const validPersonas = ['highSchool', 'college', 'jobSeeker'];
    const safePersona = validPersonas.includes(persona) ? persona : 'college';

    const baseStructure = JSON.stringify({ summary: "Brief summary.", strengths: [{ skill: "Skill", context: "Context", icon: "IconName" }], growthAreas: [{ skill: "Skill", context: "Context", icon: "IconName" }], careerAnalysis: [{ title: "Job Title", reasoning: "Reasoning", salaryRange: "$50k-70k", jobOutlook: "Outlook", keyAlignments: [{ userTrait: "Trait", jobRequirement: "Req", icon: "Icon" }], skillsToBuild: [{ skill: "Skill", suggestedFirstStep: "Step", icon: "Icon" }], suggestedCertifications: [{ name: "Cert", issuer: "Issuer", icon: "Icon" }], suggestedCourses: [{ platform: "Platform", courseName: "Course", icon: "Icon" }], suggestedProjects: [{ title: "Title", objective: "Obj", skillsUsed: ["A"], difficulty: "Level", featureSuggestions: ["A"] }] }] });

    const validIcons = "Code, Database, Server, Cloud, Briefcase, BookOpen, GraduationCap, Award, Trophy, Target, Zap, TrendingUp, Rocket, Cpu, Globe, Lock, Key, Users, Palette, PenTool, Figma, Layout, Package, Settings, Shield, Terminal, FileCode, GitBranch, Layers, Box, Cog, CheckCircle, Star, Heart, ThumbsUp, Activity, BarChart, PieChart, LineChart, Workflow, Network, Link, Upload, Download, Edit, Eye, Search, MessageCircle, Calendar, Clock, Map, Navigation, Compass, Building, Store, Film, Music, Camera, Video, Laptop, HardDrive, Wifi, Lightbulb, Sparkles";

    const prompt = `Act as a ${safePersona} career coach. Skills: ${JSON.stringify(safeSkills)}. Interests: ${safeInterests}. Experience: ${safeExperience}. 
    
IMPORTANT: For ALL icon fields, you MUST use ONLY these exact lucide-react icon names: ${validIcons}

SALARY FORMAT: salaryRange MUST be a short human-readable range string (e.g., $50k-70k or ₹8-12 LPA). Use the currency/style that best matches the user's context.

Choose icons that are semantically relevant. Examples:
- For coding: Code, FileCode, Terminal, GitBranch
- For data: Database, Server, BarChart  
- For cloud: Cloud, Server, Rocket
- For design: Palette, PenTool, Figma, Layout
- For AI: Cpu, Network, Zap
- For security: Shield, Lock, Key
- For certifications: Award, GraduationCap, Trophy
- For courses: BookOpen, Video, Laptop
- For general tech: Code, Settings, Cog

Return JSON matching this structure: ${baseStructure}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const parsedResponse = JSON.parse(responseText);

      if (!isPro) {
        const db = admin.firestore();
        const profileRef = db.collection('profiles').doc(uid);
        await profileRef.set({
          dailyCreations: admin.firestore.FieldValue.arrayUnion(admin.firestore.Timestamp.now())
        }, { merge: true });
      }

      return res.status(200).json(parsedResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Raw:', responseText.substring(0, 200));
      return res.status(500).json({ error: 'AI returned invalid response format. Please try again.' });
    }

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "Failed to generate analysis" });
  }
}
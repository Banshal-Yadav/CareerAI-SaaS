import { GoogleGenerativeAI } from "@google/generative-ai";
import admin from 'firebase-admin';

// switch to node.js runtime for firebase-admin support
export const config = {
  maxDuration: 60,
};

// initialize firebase admin
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
  // handle cors
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // todo: lock this down to your specific domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // verify api key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server API Key missing' });
    }

    // verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {
      await admin.auth().verifyIdToken(idToken);
    } catch (authError) {
      console.error('Token verification failed:', authError);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // generate content
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const { matchedSkills, interests, persona, experience } = req.body;

    if (!matchedSkills || !Array.isArray(matchedSkills) || matchedSkills.length > 50) {
      return res.status(400).json({ error: 'Invalid skills data' });
    }
    if (!interests || typeof interests !== 'string' || interests.length > 500) {
      return res.status(400).json({ error: 'Interests too long (max 500 chars)' });
    }
    if (persona === 'jobSeeker' && (!experience || experience.length > 100)) {
      return res.status(400).json({ error: 'Invalid experience data' });
    }

    const baseStructure = JSON.stringify({ summary: "Brief summary.", strengths: [{ skill: "Skill", context: "Context", icon: "IconName" }], growthAreas: [{ skill: "Skill", context: "Context", icon: "IconName" }], careerAnalysis: [{ title: "Job Title", reasoning: "Reasoning", salaryRange: "₹5-7 LPA", jobOutlook: "Outlook", keyAlignments: [{ userTrait: "Trait", jobRequirement: "Req", icon: "Icon" }], skillsToBuild: [{ skill: "Skill", suggestedFirstStep: "Step", icon: "Icon" }], suggestedCertifications: [{ name: "Cert", issuer: "Issuer", icon: "Icon" }], suggestedCourses: [{ platform: "Platform", courseName: "Course", icon: "Icon" }], suggestedProjects: [{ title: "Title", objective: "Obj", skillsUsed: ["A"], difficulty: "Level", featureSuggestions: ["A"] }] }] });

    const validIcons = "Code, Database, Server, Cloud, Briefcase, BookOpen, GraduationCap, Award, Trophy, Target, Zap, TrendingUp, Rocket, Cpu, Globe, Lock, Key, Users, Palette, PenTool, Figma, Layout, Package, Settings, Shield, Terminal, FileCode, GitBranch, Layers, Box, Cog, CheckCircle, Star, Heart, ThumbsUp, Activity, BarChart, PieChart, LineChart, Workflow, Network, Link, Upload, Download, Edit, Eye, Search, MessageCircle, Calendar, Clock, Map, Navigation, Compass, Building, Store, Film, Music, Camera, Video, Laptop, HardDrive, Wifi, Lightbulb, Sparkles";

    const prompt = `Act as a ${persona} career coach. Skills: ${JSON.stringify(matchedSkills)}. Interests: ${interests}. Experience: ${experience}. 

IMPORTANT: For ALL icon fields, you MUST use ONLY these exact lucide-react icon names: ${validIcons}

SALARY FORMAT: All salaryRange fields MUST be in Indian format using ₹X-Y LPA (e.g., ₹5-7 LPA, ₹8-12 LPA, ₹15-20 LPA). Never use USD or other currencies.

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
    return res.status(200).json(JSON.parse(responseText));

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "Failed to generate analysis" });
  }
}
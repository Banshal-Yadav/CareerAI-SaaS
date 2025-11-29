import { GoogleGenerativeAI } from "@google/generative-ai";
export const config = { runtime: 'edge', };

export default async function handler(req) {
  if (req.method === 'OPTIONS') { return new Response(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', }, }); }

  if (req.method !== 'POST') { return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' }, }); }

  try {
    const apiKey = process.env.GEMINI_API_KEY; if (!apiKey) { return new Response(JSON.stringify({ error: 'Server API Key missing' }), { status: 500, headers: { 'Content-Type': 'application/json' }, }); }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    const { matchedSkills, interests, persona, experience } = await req.json();

    if (!matchedSkills || !Array.isArray(matchedSkills) || matchedSkills.length > 50) {
      return new Response(JSON.stringify({ error: 'Invalid skills data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (!interests || typeof interests !== 'string' || interests.length > 500) {
      return new Response(JSON.stringify({ error: 'Interests too long (max 500 chars)' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (persona === 'jobSeeker' && (!experience || experience.length > 100)) {
      return new Response(JSON.stringify({ error: 'Invalid experience data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const baseStructure = JSON.stringify({ summary: "Brief summary.", strengths: [{ skill: "Skill", context: "Context", icon: "IconName" }], growthAreas: [{ skill: "Skill", context: "Context", icon: "IconName" }], careerAnalysis: [{ title: "Job Title", reasoning: "Reasoning", salaryRange: "Salary", jobOutlook: "Outlook", keyAlignments: [{ userTrait: "Trait", jobRequirement: "Req", icon: "Icon" }], skillsToBuild: [{ skill: "Skill", suggestedFirstStep: "Step", icon: "Icon" }], suggestedCertifications: [{ name: "Cert", issuer: "Issuer", icon: "Icon" }], suggestedCourses: [{ platform: "Platform", courseName: "Course", icon: "Icon" }], suggestedProjects: [{ title: "Title", objective: "Obj", skillsUsed: ["A"], difficulty: "Level", featureSuggestions: ["A"] }] }] });

    const validIcons = "Code, Database, Server, Cloud, Briefcase, BookOpen, GraduationCap, Award, Trophy, Target, Zap, TrendingUp, Rocket, Cpu, Globe, Lock, Key, Users, Palette, PenTool, Figma, Layout, Package, Settings, Shield, Terminal, FileCode, GitBranch, Layers, Box, Cog, CheckCircle, Star, Heart, ThumbsUp, Activity, BarChart, PieChart, LineChart, Workflow, Network, Link, Upload, Download, Edit, Eye, Search, MessageCircle, Calendar, Clock, Map, Navigation, Compass, Building, Store, Film, Music, Camera, Video, Laptop, HardDrive, Wifi, Lightbulb, Sparkles";

    const prompt = `Act as a ${persona} career coach. Skills: ${JSON.stringify(matchedSkills)}. Interests: ${interests}. Experience: ${experience}. 

IMPORTANT: For ALL icon fields, you MUST use ONLY these exact lucide-react icon names: ${validIcons}

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
    return new Response(responseText, { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, });

  } catch (error) { console.error("AI Error:", error); return new Response(JSON.stringify({ error: "Failed to generate analysis" }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, }); }
}
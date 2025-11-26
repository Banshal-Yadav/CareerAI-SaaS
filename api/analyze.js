// api/analyze.js
import { GoogleGenerativeAI } from "@google/generative-ai";
export const config = { runtime: 'edge', };

export default async function handler(req) { //  CORS setup 
if (req.method === 'OPTIONS') { return new Response(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', }, }); }

// only allow POST 
if (req.method !== 'POST') { return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' }, }); }

try { // securely access Key (Server-Side Only) 
const apiKey = process.env.GEMINI_API_KEY; if (!apiKey) { return new Response(JSON.stringify({ error: 'Server API Key missing' }), { status: 500, headers: { 'Content-Type': 'application/json' }, }); }

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});
const { matchedSkills, interests, persona, experience } = await req.json();
//  construct prompt 
const baseStructure = JSON.stringify({ summary: "Brief summary.", strengths: [{ skill: "Skill", context: "Context", icon: "IconName" }], growthAreas: [{ skill: "Skill", context: "Context", icon: "IconName" }], careerAnalysis: [{ title: "Job Title", reasoning: "Reasoning", salaryRange: "Salary", jobOutlook: "Outlook", keyAlignments: [{ userTrait: "Trait", jobRequirement: "Req", icon: "Icon" }], skillsToBuild: [{ skill: "Skill", suggestedFirstStep: "Step", icon: "Icon" }], suggestedCertifications: [{ name: "Cert", issuer: "Issuer", icon: "Icon" }], suggestedCourses: [{ platform: "Platform", courseName: "Course", icon: "Icon" }], suggestedProjects: [{ title: "Title", objective: "Obj", skillsUsed: ["A"], difficulty: "Level", featureSuggestions: ["A"] }] }] });

const prompt = `Act as a ${persona} career coach. Skills: ${JSON.stringify(matchedSkills)}. Interests: ${interests}. Experience: ${experience}. Return JSON matching this structure: ${baseStructure}`;
const result = await model.generateContent(prompt);
const responseText = result.response.text();
return new Response(responseText, { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, });

} catch (error) { console.error("AI Error:", error); return new Response(JSON.stringify({ error: "Failed to generate analysis" }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, }); } }
export const getBasePromptStructure = () => ({
  summary: "a brief, encouraging summary (2-4 sentences).",
  strengths: [{ 
    skill: "a key skill", 
    context: "a short phrase on why it's a strength",
    icon: "a relevant lucide-react icon name (e.g., 'Database', 'Code', 'Paintbrush')",
  }],
  growthAreas: [{ 
    skill: "a skill to develop", 
    context: "a short phrase on why it's important",
    icon: "a relevant lucide-react icon name (e.g., 'GitMerge', 'Users', 'ClipboardCheck')"
  }],
  careerAnalysis: [{
    title: "a relevant career title.",
    reasoning: "a short explanation of why this career is a good match based on the user's profile.",
    keyAlignments: [{
      userTrait: "a user's skill or interest",
      jobRequirement: "how it aligns with a specific job requirement",
      icon: "a relevant lucide-react icon name (e.g., 'Puzzle', 'Lightbulb')"
    }],
    skillsToBuild: [{
      skill: "an essential skill the user is missing",
      suggestedFirstStep: "a concrete, actionable first step to learn this skill",
      icon: "a relevant lucide-react icon name (e.g., 'Cloud', 'Server', 'PenTool')"
    }],
    jobOutlook: "a brief, one-sentence overview of the job market.",
    salaryRange: "an estimated yearly salary range in inr for an entry-level position.",
    suggestedCertifications: [{ 
      name: "a relevant certification name.", 
      issuer: "the issuing organization.",
      icon: "a relevant lucide-react icon name (e.g., 'Award', 'ShieldCheck')"
    }],
    suggestedCourses: [{ 
      platform: "coursera/udemy", 
      courseName: "a specific, relevant course name.",
      icon: "a relevant lucide-react icon name (e.g., 'BookOpen', 'Youtube')"
    }],
    suggestedProjects: [
      {
        title: "a practical, hands-on project idea.",
        objective: "a one-sentence goal for the project",
        skillsUsed: ["a skill this project uses", "another skill"],
        difficulty: "beginner/intermediate/advanced",
        featureSuggestions: ["a specific feature to build (e.g., 'user authentication').", "another feature suggestion."]
      },
      {
        title: "a second, different project idea.",
        objective: "a concise goal for this other project",
        skillsUsed: ["a relevant skill", "another skill"],
        difficulty: "beginner/intermediate/advanced",
        featureSuggestions: ["a core feature for this project.", "an optional advanced feature."]
      }
    ]
  }]
});

export const prompts = {
  highSchool: (data) => `
    you are an experienced high school career counselor in india.
    a student has these skills: ${JSON.stringify(data.matchedSkills.map(s => s.name))} and interests: "${data.interests}".
    potential careers: ${JSON.stringify(data.relevantCareers.map(c => c.title))}.

    your task: return a json object.
    critical rule: you must populate all fields, including the 'featuresuggestions' array for projects.
    
    json structure: ${JSON.stringify(getBasePromptStructure())}
  `,
  college: (data) => `
    you are a university career services advisor in india, focused on helping students become job-ready.
    a student has these skills: ${JSON.stringify(data.matchedSkills.map(s => s.name))} and interests: "${data.interests}".
    potential career paths: ${JSON.stringify(data.relevantCareers.map(c => c.title))}.

    your task: return a json object.
    critical rule: 'featuresuggestions' must be a list of concrete ideas, like 'implement a search bar with filtering' or 'add a form with validation'.
    
    json structure: ${JSON.stringify(getBasePromptStructure())}
  `,
  jobSeeker: (data) => `
    you are an expert executive career coach in india.
    a professional with "${data.experience}" experience has these skills: ${JSON.stringify(data.matchedSkills.map(s => s.name))} and interests: "${data.interests}".
    relevant careers: ${JSON.stringify(data.relevantCareers.map(c => c.title))}.

    your task: return a json object.
    critical rule: ensure all fields are populated with professional-level advice. project ideas should be sophisticated.
    
    json structure: ${JSON.stringify(getBasePromptStructure())}
  `
};

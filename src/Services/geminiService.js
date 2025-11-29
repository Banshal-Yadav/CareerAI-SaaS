export const getAiSkillAnalysis = async ({ persona, matchedSkills, relevantCareers, interests, experience }) => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ persona, matchedSkills, relevantCareers, interests, experience }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling analysis service:", error);
    return { error: true, message: "Unable to generate career roadmap. Please try again later." };
  }
};

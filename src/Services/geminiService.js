export const getAiSkillAnalysis = async ({ persona, matchedSkills, relevantCareers, interests, experience, token }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers,
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

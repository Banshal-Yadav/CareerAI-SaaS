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
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'The analysis service is currently unavailable.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling analysis service:", error);
    return { error: true, message: error.message || "Unable to generate career roadmap. Please try again later." };
  }
};

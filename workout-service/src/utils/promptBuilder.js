
function buildPrompt(userBio) {
  const {
    userId,
    name,
    age,
    gender,
    height,
    weight,
    healthLimitation,
    goal,
    activityLevel,
    experience,
    workoutDays
  } = userBio;

  return `
Generate a personalized weekly workout plan in JSON format based on the following user bio:

- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- Health Limitations: ${healthLimitation || "None"}
- Fitness Goal: ${goal}
- Activity Level: ${activityLevel}
- Experience Level: ${experience}
- Workout Days per Week: ${workoutDays}

Output JSON with the following structure (no text outside JSON):

{
  "userId": "${userId}",
  "plan": {
    "overview": "...",
    "schedule": [
      {
        "day": "Monday",
        "focus": "...",
        "exercises": [
          { "name": "...", "sets": 3, "reps": "10-15", "notes": "..." }
        ],
        "warmup": [
          { "name": "...", "duration": "1 min" }
        ],
        "cooldown": [
          { "name": "...", "duration": "30s" }
        ]
      }
    ],
    "tips": {
      "fatLoss": ["...", "..."],
      "general": ["...", "..."]
    },
    "notes": ["...", "..."]
  },
  "createdAt": "2025-05-13T12:00:00Z",
  "version": 1
}
DO NOT include any explanation or content outside the JSON.
  `;
}

export default buildPrompt;

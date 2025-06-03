import axios from "axios";
import dotenv from "dotenv";
import buildContextAwarePrompt from "../utils/promptBuilder.js";

dotenv.config();

// Log API key status (first few characters only for security)
console.log(
  "Gemini API Key loaded:",
  process.env.GEMINI_API_KEY
    ? `${process.env.GEMINI_API_KEY.substring(0, 10)}...`
    : "NOT FOUND"
);

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

// Keywords to check if query is fitness-related
const FITNESS_KEYWORDS = [
  "workout",
  "exercise",
  "fitness",
  "health",
  "nutrition",
  "diet",
  "muscle",
  "weight",
  "strength",
  "cardio",
  "training",
  "gym",
  "protein",
  "calories",
  "fat",
  "lose",
  "gain",
  "build",
  "run",
  "walk",
  "swim",
  "yoga",
  "pilates",
  "bodybuilding",
  "wellness",
  "recovery",
  "rest",
  "sleep",
  "hydration",
  "vitamins",
  "supplements",
  "injury",
  "pain",
  "stretch",
  "flexibility",
  "endurance",
  "performance",
  "what can you do",
  "what do you do",
  "help me",
  "capabilities",
  "features",
];

function isHealthFitnessRelated(message) {
  const lowerMessage = message.toLowerCase();

  // Check for fitness keywords
  const hasKeywords = FITNESS_KEYWORDS.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  // Check for common fitness phrases and capability questions
  const fitnessPatterns = [
    /how to (lose|gain|build|improve)/i,
    /what (exercise|workout|diet)/i,
    /(best|good) (exercise|workout|diet|food)/i,
    /how many (calories|reps|sets)/i,
    /(meal|food) plan/i,
    /fitness (goal|plan|routine)/i,
    /(sore|tired|pain)/i,
    /what (can|do) you (do|help)/i,
    /(help|assist) me/i,
    /capabilities/i,
    /features/i,
  ];

  const hasPatterns = fitnessPatterns.some((pattern) =>
    pattern.test(lowerMessage)
  );

  return hasKeywords || hasPatterns;
}

async function getGeminiReply(userMessage, chatHistory = []) {
  try {
    console.log("Processing message:", userMessage.substring(0, 50) + "...");

    // Special response for capability questions
    if (
      /what (can|do) you (do|help)|capabilities|features/i.test(userMessage)
    ) {
      return `Hello! I'm FitCoach AI, your personal fitness and health assistant! 🏋️‍♂️

I'm specifically designed to help you with fitness, health, and nutrition topics. Here's how I can assist you:

🏋️ Workout Planning - Custom routines for your goals
💪 Exercise Guidance - Proper form and techniques  
🥗 Nutrition Advice - Meal plans and dietary tips
😴 Health & Wellness - Recovery, sleep, and lifestyle tips

Could you please ask me something related to fitness, health, or nutrition? I'm here to help you achieve your fitness goals! 

Try asking me:
• "Help me create a workout routine"
• "What should I eat for muscle building?"
• "How can I improve my cardio endurance?"`;
    }

    // Check if the message is fitness-related
    if (!isHealthFitnessRelated(userMessage)) {
      console.log("Message not fitness-related, providing redirect response");
      return `I'm FitCoach AI, your dedicated fitness and health assistant! 🏋️‍♂️ 

I'm specifically designed to help you with fitness, health, and nutrition topics. Here's how I can assist you:

🏋️ Workout Planning - Custom routines for your goals
💪 Exercise Guidance - Proper form and techniques  
🥗 Nutrition Advice - Meal plans and dietary tips
😴 Health & Wellness - Recovery, sleep, and lifestyle tips

Could you please ask me something related to fitness, health, or nutrition? I'm here to help you achieve your fitness goals! 

Try asking me:
• "Help me create a workout routine"
• "What should I eat for muscle building?"
• "How can I improve my cardio endurance?"`;
    }

    console.log("Message is fitness-related, processing with Gemini...");

    const contextPrompt = buildContextAwarePrompt(userMessage, chatHistory);

    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [{ text: contextPrompt }],
          role: "user",
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    let result =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm having trouble generating a response right now. Please try again!";

    // Clean up the response
    result = result.trim();

    // Add emoji if it's a particularly positive response
    if (
      result.includes("great") ||
      result.includes("excellent") ||
      result.includes("awesome")
    ) {
      result += " 🎉";
    }

    console.log("Gemini response generated successfully");
    return result;
  } catch (error) {
    console.error("Gemini error:", error.response?.data || error.message);

    // Return a fitness-focused fallback response
    return `I'm experiencing some technical difficulties right now, but I'm still here to help with your fitness journey! 

Please try asking me about:
• Your workout routine
• Nutrition advice  
• Exercise techniques
• Fitness goals

Try your question again in a moment! 💪`;
  }
}

export { getGeminiReply };

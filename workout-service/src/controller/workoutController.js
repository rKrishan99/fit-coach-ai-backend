import buildPrompt from "../utils/promptBuilder.js";
import generateAIPlan from "../services/aiService.js"; // Renamed import
import fetchUserBio from "../services/userService.js";
import { WorkoutPlan } from "../model/WorkoutPlan.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Environment variables:");
console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
console.log("USER_SERVICE_URL:", process.env.USER_SERVICE_URL);

async function generateWorkoutPlan(_, { userId }) {
  try {
    console.log("Generating plan for userId:", userId);

    // Fetch user bio data
    const userBio = await fetchUserBio(userId);
    console.log("Fetched user bio:", userBio);

    // Generate prompt
    const prompt = buildPrompt(userBio);
    console.log("Generated prompt:", prompt.substring(0, 200) + "...");

    // Get AI generated plan
    const aiPlan = await generateAIPlan(prompt);
    console.log("Received AI Plan:", aiPlan.substring(0, 200) + "...");

    let savedPlan;

    // First check if a plan exists for this user
    const existingPlan = await WorkoutPlan.findOne({ userId });

    if (existingPlan) {
      savedPlan = await WorkoutPlan.findOneAndUpdate(
        { userId },
        { plan: aiPlan },
        { new: true }
      );
      console.log("Updated workout plan for user:", userId);
    } else {
      savedPlan = await WorkoutPlan.create({ userId, plan: aiPlan });
      console.log("Created new workout plan for user:", userId);
    }

    return savedPlan;
  } catch (error) {
    console.error("Error in generateWorkoutPlan:", error);
    throw new Error(`Failed to generate workout plan: ${error.message}`);
  }
}

async function getWorkoutPlan(_, { userId }) {
  try {
    console.log("Fetching workout plan for userId:", userId);
    const plan = await WorkoutPlan.findOne({ userId }).sort({ createdAt: -1 });
    
    if (!plan) {
      console.log("No workout plan found for user:", userId);
      return null;
    }
    
    console.log("Found workout plan for user:", userId);
    return plan;
  } catch (error) {
    console.error("Error in getWorkoutPlan:", error);
    throw new Error(`Failed to get workout plan: ${error.message}`);
  }
}

export { generateWorkoutPlan, getWorkoutPlan };

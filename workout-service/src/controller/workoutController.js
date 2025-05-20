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
  console.log("Generating plan for userId:", userId);

  const userBio = await fetchUserBio(userId);
  console.log("Fetched user bio:", userBio);

  const prompt = buildPrompt(userBio);
  console.log("Generated prompt:", prompt.substring(0, 100) + "...");

  const aiPlan = await generateAIPlan(prompt);
  console.log("Received AI Plan:", aiPlan.substring(0, 100) + "...");

  let savedPlan;

  // First check if a plan exists for this user
  const existingPlan = await WorkoutPlan.findOne({ userId });

  if (existingPlan) {
    savedPlan = await WorkoutPlan.findOneAndUpdate(
      { userId },
      { plan: aiPlan },
      { new: true }
    );
    console.log("Updated workout plan:", savedPlan);

    return savedPlan;
  } else {
    savedPlan = await WorkoutPlan.create({ userId, plan: aiPlan });
    console.log("Saved workout plan:", savedPlan);
    return savedPlan;
  }
}

async function getWorkoutPlan(_, { userId }) {
  return await WorkoutPlan.findOne({ userId }).sort({ createdAt: -1 });
}

export { generateWorkoutPlan, getWorkoutPlan };

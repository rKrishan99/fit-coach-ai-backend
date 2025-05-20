import axios from "axios";
import dotenv from "dotenv";

// Ensure dotenv is loaded in this module
dotenv.config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

async function fetchUserBio(userId) {
  const query = `
    query GetUserBio($userId: ID!) {
      getUserBio(userId: $userId) {
        id
        userId
        age
        gender
        weight
        height
        healthLimitation
        fitnessGoal
        activityLevel
        workoutDays
        experienceLevel
        createdAt
      }
    }
  `;

  const response = await axios.post(USER_SERVICE_URL, { 
    query,
    variables: { userId } 
  });

  // Transform the field names to match what promptBuilder expects
  const userBioData = response.data.data.getUserBio;
  return {
    name: "User", // Default name since it's not in the UserBio model
    age: userBioData.age,
    gender: userBioData.gender,
    height: userBioData.height,
    weight: userBioData.weight,
    goal: userBioData.fitnessGoal,
    activityLevel: userBioData.activityLevel,
    experience: userBioData.experienceLevel,
    workoutDays: userBioData.workoutDays
  };
}

export default fetchUserBio;

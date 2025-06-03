import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

async function fetchUserBio(userId) {
  const query = `
    query GetUserData($userId: String!) {
      getUserData(userId: $userId) {
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

  try {
    console.log(`Fetching user data for userId: ${userId}`);
    
    const response = await axios.post(USER_SERVICE_URL, { 
      query,
      variables: { userId } 
    });

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    // Transform the field names to match what promptBuilder expects
    const userBioData = response.data.data.getUserData;
    
    if (!userBioData) {
      throw new Error("User data not found");
    }

    console.log("Successfully fetched user data:", userBioData);

    return {
      userId: userBioData.userId,
      name: "User", // Default name since it's not in the UserBio model
      age: userBioData.age,
      gender: userBioData.gender,
      height: userBioData.height,
      weight: userBioData.weight,
      healthLimitation: userBioData.healthLimitation,
      goal: userBioData.fitnessGoal,
      activityLevel: userBioData.activityLevel,
      experience: userBioData.experienceLevel,
      workoutDays: userBioData.workoutDays
    };
  } catch (error) {
    console.error("Error fetching user bio:", error);
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
}

export default fetchUserBio;

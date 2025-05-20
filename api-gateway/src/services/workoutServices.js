import axios from "axios";

const WORKOUT_SERVICE_URL = process.env.WORKOUT_SERVICE_URL || "http://localhost:4003/graphql";

export const getWorkoutPlan = async (userId) => {
  try {
    const response = await axios.post(WORKOUT_SERVICE_URL, {
      query: `
          query GetWorkoutPlan($userId: ID!) {
            getWorkoutPlan(userId: $userId) {
              id
              userId
              plan
              createdAt
            }
          }
        `,
      variables: { userId },
    });

    return response.data.data.getWorkoutPlan;
  } catch (error) {
    throw new Error(`Failed to fetch workout plan: ${error.message}`);
  }
};

export const generateWorkoutPlan = async (userId) => {
  try {
    const response = await axios.post(WORKOUT_SERVICE_URL, {
      query: `
            mutation GenerateWorkoutPlan($userId: ID!) {
                generateWorkoutPlan(userId: $userId) {
                id
                userId
                plan
                createdAt
                }
            }
            `,
      variables: { userId },
    });

    if (response.errors || response.data.errors) {
      console.error("GraphQL errors from workout-service:", response.data.errors);
      throw new Error(response.data.errors?.[0]?.message || "Unknown error from workout-service");
    }

    return response.data.data.generateWorkoutPlan;
  } catch (error) {
    console.error("API Gateway generateWorkoutPlan error:", error.response?.data || error.message);
    throw new Error(`Failed to generate workout plan: ${error.message}`);
  }
};

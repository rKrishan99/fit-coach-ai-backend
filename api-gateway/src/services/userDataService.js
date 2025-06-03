import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const USER_DATA_SERVICE_URL =
  process.env.USER_DATA_SERVICE_URL || "http://localhost:4002/graphql";

export const getUserData = async (userId) => {
  try {
    console.log(
      `Fetching user data from ${USER_DATA_SERVICE_URL} for userId: ${userId}`
    );

    const response = await axios.post(USER_DATA_SERVICE_URL, {
      query: `
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
      `,
      variables: { userId: String(userId) },
    });

    if (response.data.errors) {
      console.error("User data service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.getUserData;
  } catch (error) {
    console.error("User data service request failed:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

export const createUserData = async (input) => {
  try {
    const {
      userId,
      age,
      gender,
      weight,
      height,
      healthLimitation,
      fitnessGoal,
      activityLevel,
      workoutDays,
      experienceLevel,
    } = input;

    const response = await axios.post(USER_DATA_SERVICE_URL, {
      query: `
        mutation CreateUserData(
          $userId: String!
          $age: Int!
          $gender: String!
          $weight: Float!
          $height: Float!
          $healthLimitation: String!
          $fitnessGoal: String!
          $activityLevel: String!
          $workoutDays: String!
          $experienceLevel: String!
        ) {
          createUserData(
            userId: $userId
            age: $age
            gender: $gender
            weight: $weight
            height: $height
            healthLimitation: $healthLimitation
            fitnessGoal: $fitnessGoal
            workoutDays: $workoutDays
            activityLevel: $activityLevel
            experienceLevel: $experienceLevel
          ) {
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
      `,
      variables: {
        userId: String(userId),
        age,
        gender,
        weight,
        height,
        healthLimitation,
        fitnessGoal,
        activityLevel,
        workoutDays,
        experienceLevel,
      },
    });

    if (response.data.errors) {
      console.error("Service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.createUserData;
  } catch (error) {
    console.error("Request details:", {
      url: USER_DATA_SERVICE_URL,
      input: input,
      error: error.response?.data || error.message,
    });
    throw new Error(`Failed to create user data: ${error.message}`);
  }
};

export const updateUserData = async (id, updates) => {
  try {
    const response = await axios.post(USER_DATA_SERVICE_URL, {
      query: `
        mutation UpdateUserData($id: ID!, $updates: UserDataUpdates!) {
          updateUserData(id: $id, updates: $updates) {
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
          }
        }
      `,
      variables: { id, updates },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.updateUserData;
  } catch (error) {
    throw new Error(`Failed to update user data: ${error.message}`);
  }
};

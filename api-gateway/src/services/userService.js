import axios from "axios";

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

export const getUserBio = async (userId) => {
  try {
    const response = await axios.post(USER_SERVICE_URL, {
      query: `
        query GetUserBio($userId: String!) {
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
      `,
      variables: { userId },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.getUserBio;
  } catch (error) {
    throw new Error(`Failed to fetch user bio: ${error.message}`);
  }
};

export const createUserBio = async (input) => {
  try {
    const response = await axios.post(USER_SERVICE_URL, {
      query: `
        mutation CreateUserBio(
          $userId: ID!
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
          createUserBio(
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
      variables: input, // Just pass the input directly, no need to wrap it
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.createUserBio;
  } catch (error) {
    throw new Error(`Failed to create user bio: ${error.message}`);
  }
};

export const updateUserBio = async (id, updates) => {
  try {
    const response = await axios.post(USER_SERVICE_URL, {
      query: `
        mutation UpdateUserBio($id: ID!, $updates: UserBioUpdates!) {
          updateUserBio(id: $id, updates: $updates) {
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

    return response.data.data.updateUserBio;
  } catch (error) {
    throw new Error(`Failed to update user bio: ${error.message}`);
  }
};

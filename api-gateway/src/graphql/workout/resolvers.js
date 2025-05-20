import {
  getWorkoutPlan,
  generateWorkoutPlan,
} from "../../services/workoutServices.js";

export const resolvers = {
  Query: {
    getWorkoutPlan: async (_, { userId }) => {
      return await getWorkoutPlan(userId);
    },
  },
  Mutation: {
    generateWorkoutPlan: async (_, { userId }) => {
      return await generateWorkoutPlan(userId);
    },
  },
};
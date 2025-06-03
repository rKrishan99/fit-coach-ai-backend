import { createUserData, getUserData, updateUserData } from "../../services/userDataService.js";

export const resolvers = {
  Query: {
    getUserData: async (_, { userId }) => {
      return await getUserData(userId);
    },
  },
  
  Mutation: {
    createUserData: async (_, userData) => {
      return await createUserData(userData);
    },
    
    updateUserData: async (_, { userId, ...userData }) => {
      return await updateUserData(userId, userData);
    },
  },
};

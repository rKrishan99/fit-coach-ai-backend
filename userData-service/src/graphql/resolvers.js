import { UserData } from "../model/UserData.js";

export const resolvers = {
  Query: {
    getUserData: async (_, { userId }) => {
      const userData = await UserData.findOne({ userId });
      if (!userData) throw new Error("User data not found");
      return userData;
    },
    _: () => true,
  },

  Mutation: {
    createUserData: async (_, args) => {
    console.log("Received createUserData request with args:", args);
    
    try {
      const existingData = await UserData.findOne({ userId: args.userId });
      if (existingData) {
        console.log("User data already exists for userId:", args.userId);
        throw new Error("User data already exists");
      }

      console.log("Creating new user data record");
      const userData = await UserData.create(args);
      
      console.log("Successfully created user data:", userData);
      return userData;
    } catch (error) {
      console.error("Error creating user data:", error);
      throw error;
    }
  },

    updateUserData: async (_, { id, ...updates }) => {
      const userData = await UserData.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!userData) throw new Error("User data not found");
      return userData;
    },
  },
};

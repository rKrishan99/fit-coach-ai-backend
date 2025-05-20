import { 
  getUserBio,
  createUserBio,
  updateUserBio
} from "../../services/userService.js";

export const resolvers = {
  Query: {
    getUserBio: async (_, { userId }) => {
      return await getUserBio(userId);
    },
    _: () => true,
  },
  Mutation: {
    createUserBio: async (_, args) => {
      return await createUserBio(args);
    },
    updateUserBio: async (_, { id, ...updates }) => {
      return await updateUserBio(id, updates);
    },
  },
};
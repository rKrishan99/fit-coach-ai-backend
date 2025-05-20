import { UserBio } from "../model/UserBio.js";

export const resolvers = {
  Query: {
    getUserBio: async (_, { userId }) => {
      const userBio = await UserBio.findOne({ userId });
      if (!userBio) throw new Error("User bio not found");
      return userBio;
    },
    _: () => true,
  },

  Mutation: {
    createUserBio: async (_, args) => {
      const existingBio = await UserBio.findOne({ userId: args.userId });
      if (existingBio) throw new Error("User bio already exists");

      const userBio = await UserBio.create(args);
      return userBio;
    },

  },
};

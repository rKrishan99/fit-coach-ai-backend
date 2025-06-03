import { getReply, getChatHistory } from "../../services/chatbotServices.js";

export const resolvers = {
  Query: {
    getChatHistory: async (_, { userId }) => {
      return await getChatHistory({ userId });
    },
  },
  Mutation: {
    sendMessage: async (_, { userId, message }) => {
      return await getReply({ userId, message });
    },
  },
};

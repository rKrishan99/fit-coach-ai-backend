import { ChatMessage } from "../model/ChatMessage.js";
import { getGeminiReply } from "../gemini/geminiClient.js";

export const resolvers = {
  Query: {
    ping: () => "FitCoach AI Chatbot is live! 🏋️‍♂️",
    getChatHistory: async (_, { userId }) => {
      try {
        const messages = await ChatMessage.find({ userId })
          .sort({ timestamp: 1 })
          .limit(50) // Limit to last 50 messages
          .lean();
        
        return messages.map(msg => ({
          sender: msg.sender,
          text: msg.text,
          timestamp: msg.timestamp.toISOString()
        }));
      } catch (error) {
        console.error("Error fetching chat history:", error);
        throw new Error("Failed to load chat history");
      }
    },
  },
  Mutation: {
    sendMessage: async (_, { userId, message }) => {
      try {
        const timestamp = new Date();

        // Get recent chat history for context
        const recentMessages = await ChatMessage.find({ userId })
          .sort({ timestamp: -1 })
          .limit(10)
          .lean();
        
        const chatHistory = recentMessages.reverse().map(msg => ({
          sender: msg.sender,
          text: msg.text,
          timestamp: msg.timestamp.toISOString()
        }));

        // Save user message
        const userMsg = new ChatMessage({
          userId,
          sender: "user",
          text: message,
          timestamp
        });
        await userMsg.save();

        // Get AI response with context
        const reply = await getGeminiReply(message, chatHistory);
        
        // Save bot message
        const botMsg = new ChatMessage({
          userId,
          sender: "bot",
          text: reply,
          timestamp: new Date()
        });
        await botMsg.save();

        // Return latest history (last 20 messages)
        const messages = await ChatMessage.find({ userId })
          .sort({ timestamp: -1 })
          .limit(20)
          .lean();

        const history = messages.reverse().map(msg => ({
          sender: msg.sender,
          text: msg.text,
          timestamp: msg.timestamp.toISOString()
        }));

        return {
          reply,
          history
        };
      } catch (error) {
        console.error("Error in sendMessage:", error);
        throw new Error("Failed to send message");
      }
    }
  },
};

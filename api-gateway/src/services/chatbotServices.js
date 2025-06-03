import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CHATBOT_SERVICE_URL = process.env.CHATBOT_SERVICE_URL;

export const getReply = async ({ userId, message }) => {
  try {
    console.log(`Sending message to chatbot service: ${CHATBOT_SERVICE_URL}`);
    
    const response = await axios.post(CHATBOT_SERVICE_URL, {
      query: `
        mutation SendMessage($userId: String!, $message: String!) {
          sendMessage(userId: $userId, message: $message) {
            reply
            history {
              sender
              text
              timestamp
            }
          }
        }
      `,
      variables: { userId, message },
    });

    if (response.data.errors) {
      console.error("Chatbot service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.sendMessage;
  } catch (error) {
    console.error("Chatbot service request failed:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to send message: ${error.message}`);
  }
};

export const getChatHistory = async ({ userId }) => {
  try {
    console.log(`Fetching chat history from: ${CHATBOT_SERVICE_URL} for userId: ${userId}`);
    
    const response = await axios.post(CHATBOT_SERVICE_URL, {
      query: `
        query GetChatHistory($userId: String!) {
          getChatHistory(userId: $userId) {
            sender
            text
            timestamp
          }
        }
      `,
      variables: { userId },
    });

    if (response.data.errors) {
      console.error("Chatbot service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.getChatHistory;
  } catch (error) {
    console.error("Error in getChatHistory:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to fetch chat history: ${error.message}`);
  }
};
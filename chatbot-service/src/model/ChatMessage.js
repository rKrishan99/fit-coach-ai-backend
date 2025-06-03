import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  sender: {
    type: String,
    required: true,
    enum: ['user', 'bot']
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for efficient querying
chatMessageSchema.index({ userId: 1, timestamp: 1 });

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
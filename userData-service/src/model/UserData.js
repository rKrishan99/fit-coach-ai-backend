import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  healthLimitation: {
    type: String,
    required: true,
  },
  fitnessGoal: {
    type: String,
    required: true,
  },
  activityLevel: {
    type: String,
    required: true,
  },
  workoutDays: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserData = mongoose.model("UserData", userDataSchema);

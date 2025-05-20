import mongoose, { model, Schema } from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

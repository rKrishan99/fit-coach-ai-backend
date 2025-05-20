import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generateWorkoutPlan(promptText) {
  try {
    console.log(
      "Calling Gemini API with prompt:",
      promptText.substring(0, 100) + "..."
    );

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: promptText }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if we got a valid response
    if (
      !response.data ||
      !response.data.candidates ||
      !response.data.candidates[0]
    ) {
      console.error("Invalid Gemini API response:", response.data);
      throw new Error("Invalid response from AI service");
    }

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}

export default generateWorkoutPlan;

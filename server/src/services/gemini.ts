import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const callGeminiAPI = async (promptText: string): Promise<string> => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [{ text: promptText }],
        },
      ],
    });

    // response.text contains the generated text
    const text = response.text ?? "No response from Gemini API";
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating response.";
  }
};

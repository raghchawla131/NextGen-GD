import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    // Response's text is inside `candidates[0].content.parts[0].text`
    const text = response?.text ?? "No response from gemini";
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

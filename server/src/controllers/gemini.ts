import { Request, Response } from "express";
import { callGeminiAPI } from "../services/gemini";

export const generateFromGemini = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const output = await callGeminiAPI(prompt);
    res.json({ result: output});
  }
  catch(error) {
    res.status(500).json({ error: "Failed to generate response from Gemini" });
  }
}
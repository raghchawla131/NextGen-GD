import axios, { AxiosResponse } from "axios";

// Define the expected response shape from backend
interface GeminiResponse {
  result: string;
}

export const generateFromGemini = (prompt: string): Promise<AxiosResponse<GeminiResponse>> => {
  return axios.post<GeminiResponse>(`http://localhost:8001/gemini/generate`, { prompt });
};

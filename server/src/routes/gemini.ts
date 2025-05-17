import { Router } from "express";
import { generateFromGemini } from "../controllers/gemini";

const router = Router();

router.post("/generate", generateFromGemini);

export default router;
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import geminiRoutes from "./routes/gemini"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/gemini', geminiRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
})
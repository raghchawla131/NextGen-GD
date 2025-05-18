import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import geminiRoutes from "./routes/gemini"

dotenv.config({ path: "../.env"});

const app = express();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/gemini', geminiRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
})
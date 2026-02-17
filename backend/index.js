import dotenv from "dotenv";
import express, { json } from "express";
import { connectDB } from "./src/config/db.js";
import matchRouter from "./src/api/routes/match.js";
import userRouter from "./src/api/routes/user.js";
import trainingRouter from "./src/api/routes/training.js";
import teamRouter from "./src/api/routes/team.js";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

app.use(json());   

app.use("/api/v1/user", userRouter);
app.use("/api/v1/trainig", trainingRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/match", matchRouter);

app.use("/", (req, res, next) => {
    return res.status(200).json("ey! te saludo, esto funciona");
})

app.listen(3000, () => {
    console.log("Servidor levantado en: http://localhost:3000");
});
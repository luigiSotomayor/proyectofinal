require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const matchRouter = require("./src/api/routes/match");
const userRouter = require("./src/api/routes/user");
const trainingRouter = require("./src/api/routes/training");
const teamRouter = require("./src/api/routes/team");

const app = express();

connectDB();

app.use(express.json());   

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
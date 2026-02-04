import { getTrainings, getTraining, postTraining, updateTraining, deleteTraining } from '../controllers/training.js';

import express from 'express';
const trainingRouter = express.Router();

trainingRouter.get("/", getTrainings);
trainingRouter.get("/:id", getTraining);
trainingRouter.post("/", postTraining);
trainingRouter.put("/:id", updateTraining);
trainingRouter.delete("/:id", deleteTraining);

export default trainingRouter;
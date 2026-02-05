import { getTrainings, getTraining, postTraining, updateTraining, deleteTraining } from '../controllers/training.js';
import isAuth from '../../middlewares/isAuth.js';
import hasRole from '../../middlewares/hasRole.js';

import express from 'express';
const trainingRouter = express.Router();

trainingRouter.get("/", isAuth, getTrainings);
trainingRouter.get("/:id", isAuth, getTraining);
trainingRouter.post("/", isAuth, hasRole(["director deportivo", "entrenador"]), postTraining);
trainingRouter.put("/:id", isAuth, hasRole(["director deportivo", "entrenador"]), updateTraining);
trainingRouter.delete("/:id", isAuth, hasRole(["director deportivo", "entrenador"]), deleteTraining);

export default trainingRouter;
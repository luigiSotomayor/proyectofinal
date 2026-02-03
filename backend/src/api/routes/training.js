const { getTrainings, getTraining, postTraining, updateTraining, deleteTraining } = require('../controllers/training');

const trainingRouter = require('express').Router();

trainingRouter.get("/", getTrainings);
trainingRouter.get("/:id", getTraining);
trainingRouter.post("/", postTraining);
trainingRouter.put("/:id", updateTraining);
trainingRouter.delete("/:id", deleteTraining);

module.exports = trainingRouter;
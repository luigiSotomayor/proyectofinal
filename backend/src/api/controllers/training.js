import Training from "../models/training.js";
import User from "../models/training.js";

const getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find();
    return res.status(200).json(trainings);
  } catch (error) {
    return res.status(400).json("Error al obtener los entrenamientos");
  }
};

const getTraining = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newTraining = await Training.findById(id);
        return res.status(200).json(newTraining);
    } catch (error) {
        return res.status(400).json("Error al obtener el entrenamiento");
    }
}

const postTraining = async (req, res, next) => {
  try {
    const newTraining = new Training(req.body);
    const trainingSaved = await newTraining.save();
    return res.status(201).json(trainingSaved);
  } catch (error) {
    return res.status(400).json("Error al crear el entrenamiento");
  }
};

const updateTraining = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTraining = new Training(req.body);
    newTraining._id = id;
    const trainingUpdated = await Training.findByIdAndUpdate(id, newTraining, {
      new: true,
    });
    return res.status(200).json(trainingUpdated);
  } catch (error) {
    return res.status(400).json("Error al actualizar el entrenamiento");
  }
};

const deleteTraining = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Training.findByIdAndDelete(id);
        return res.status(200).json("Entrenamiento eliminado");
    } catch (error) {
        return res.status(400).json("Error al borrar el entrenamiento");
    }
}

export {
    getTrainings,
    getTraining,
    postTraining,
    updateTraining,
    deleteTraining
}
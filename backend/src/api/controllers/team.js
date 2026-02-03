import Team from "../models/team.js";

const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find();
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(400).json("Error al obtener los equipos");
  }
};

const getTeam = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newTeam = await Team.findById(id);
        return res.status(200).json(newTeam);
    } catch (error) {
        return res.status(400).json("Error al obtener el equipo");
    }
}

const postTeam = async (req, res, next) => {
  try {
    const newTeam = new Team(req.body);
    const teamSaved = await newTeam.save();
    return res.status(201).json(teamSaved);
  } catch (error) {
    return res.status(400).json("Error al crear el equipo");
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTeam = new Team(req.body);
    newTeam._id = id;
    const teamUpdated = await Team.findByIdAndUpdate(id, newTeam, {
      new: true,
    });
    return res.status(200).json(teamUpdated);
  } catch (error) {
    return res.status(400).json("Error al actualizar el equipo");
  }
};

const deleteTeam = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Team.findByIdAndDelete(id);
        return res.status(200).json("Equipo eliminado");
    } catch (error) {
        return res.status(400).json("Error al borrar el equipo");
    }
}

export {
    getTeams,
    getTeam,
    postTeam,
    updateTeam,
    deleteTeam
}
import Team from "../models/team.js";

const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().populate("players").populate("coach");
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(400).json("Error al obtener los equipos");
  }
};

const getTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTeam = await Team.findById(id).populate("players");
    return res.status(200).json(newTeam);
  } catch (error) {
    return res.status(400).json("Error al obtener el equipo");
  }
};

const getTeamByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const team = await Team.findOne({ players: userId })
      .populate("players")
      .populate("coach");
    if (!team) {
      return res.status(404).json("Equipo no encontrado");
    }
    const teamToReturn = {
      _id: team._id,
      name: team.name,
    };
    return res.status(200).json(teamToReturn);
  } catch (error) {
    return res.status(400).json("Error al obtener el equipo por id de usuario");
  }
};

const getTeamByCoachId = async (req, res, next) => {
  try {
    const { coachId } = req.params;
    const teams = await Team.find({ coach: coachId })
      .populate("coach"); 
      if (!teams) {
      return res.status(404).json("Ningún equipo encontrado para este entrenador");
    }
    /* const teamsToReturn = [{
      _id: teams._id,
      name: teams.name,
    }]; */
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(400).json("Error al obtener los equipos por id de entrenador");
  }
};

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
    })
      .populate("players")
      .populate("coach");
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
};

export { getTeams, getTeam, getTeamByUserId, getTeamByCoachId, postTeam, updateTeam, deleteTeam };

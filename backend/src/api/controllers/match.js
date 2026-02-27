import Match from "../models/match.js";

const getMatches = async (req, res, next) => {
  try {
    const matches = await Match.find().populate("team", "name");
    return res.status(200).json(matches);
  } catch (error) {
    return res.status(400).json("Error al obtener los partidos");
  }
};

const getMatchesByTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    const matches = await Match.find({ team: teamId }).populate("team", "name");

    return res.status(200).json(matches);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error al obtener los partidos del equipo");
  }
}

const getMatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newMatch = await Match.findById(id);
        return res.status(200).json(newMatch);
    } catch (error) {
        return res.status(400).json("Error al obtener el partido");
    }
}

const postMatch = async (req, res, next) => {
  try {
    const newMatch = new Match(req.body);
    const matchSaved = await newMatch.save();
    return res.status(201).json(matchSaved);
  } catch (error) {
    return res.status(400).json("Error al crear el partido");
  }
};

const updateMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newMatch = new Match(req.body);
    newMatch._id = id;
    const matchUpdated = await Match.findByIdAndUpdate(id, newMatch, {
      new: true,
    });
    return res.status(200).json(matchUpdated);
  } catch (error) {
    return res.status(400).json("Error al actualizar el partido");
  }
};

const deleteMatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Match.findByIdAndDelete(id);
        return res.status(200).json("Partido eliminado");
    } catch (error) {
        return res.status(400).json("Error al borrar el partido");
    }
}

export {
    getMatches,
    getMatchesByTeam,
    getMatch,
    postMatch,
    updateMatch,
    deleteMatch
}
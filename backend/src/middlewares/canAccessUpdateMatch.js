import Match from "../api/models/match.js";
import Team from "../api/models/team.js";

const canAccessUpdateMatch = async (req, res, next) => {
  try {
    const user = req.user;
    const matchId = req.params.id;

    if (!matchId) {
      return res.status(400).json("Match id is required");
    }

    // director deportivo acceso total
    if (user.role === "director deportivo") {
      return next();
    }

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json("Match not found");
    }

    const team = await Team.findById(match.team);

    if (!team) {
      return res.status(404).json("Team not found");
    }

    // entrenador del equipo
    if (
      user.role === "entrenador" &&
      team.coach?.toString() === user._id.toString()
    ) {
      return next();
    }

    return res.status(401).json("Access denied");
  } catch (error) {
    return res.status(400).json("Bad request");
  }
};

export default canAccessUpdateMatch;
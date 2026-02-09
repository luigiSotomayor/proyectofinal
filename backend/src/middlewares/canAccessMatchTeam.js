import Match from "../api/models/match.js";
import Team from "../api/models/team.js";

const canAccessMatchTeam = async (req, res, next) => {
  try {
    const { id: matchId } = req.params;
    const user = req.user;
    console.log("matchId:", matchId);
    const match = await Match.findById(matchId);
    console.log("Match found:", match);
    if (!match) {
      return res.status(404).json("Match not found");
    }

    const team = await Team.findById(match.team);
    console.log("Team found:", team);
    console.log("id user:", user._id);
    if (!team) {
      return res.status(404).json("Team not found");
    }
    console.log("User role:", user.role);
    // Director deportivo
    if (user.role === "director deportivo") return next();

    // Entrenador
    if (
      user.role === "entrenador" &&
      team.coach?.toString() === user._id.toString()
    ) return next();

    // Jugador
    if (
      user.role === "jugador" &&
      team.players.some(
        p => p.toString() === user._id.toString()
      )
    ) return next();

    return res.status(401).json("Access denied");
  } catch (error) {
    return res.status(400).json("bad request");
  }
};

export default canAccessMatchTeam;

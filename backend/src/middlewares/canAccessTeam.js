import Team from "../api/models/team.js";

const canAccessTeam = async (req, res, next) => {
  try {
    const user = req.user;

    const teamId =
      req.params.teamId || req.params.id;

    if (!teamId) {
      return res.status(400).json("Team id is required");
    }

    //El director deportivo tiene acceso total
    if (user.role === "director deportivo") {
      return next();
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json("Team not found");
    }

    //Si es entrenador del equipo tiene acceso al mismo
    if (
      user.role === "entrenador" &&
      team.coach?.toString() === user._id.toString()
    ) {
      return next();
    }

    //Si es jugador del equipo tiene acceso al mismo
    if (
      user.role === "jugador" &&
      team.players.some(
        (playerId) => playerId.toString() === user._id.toString()
      )
    ) {
      return next();
    }

    return res.status(401).json("Access denied");
  } catch (error) {
    return res.status(400).json("Bad request");
  }
};

export default canAccessTeam;

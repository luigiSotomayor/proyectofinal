const { getTeams, getTeam, postTeam, updateTeam, deleteTeam } = require('../controllers/team');

const teamRouter = require('express').Router();

teamRouter.get("/", getTeams);
teamRouter.get("/:id", getTeam);
teamRouter.post("/", postTeam);
teamRouter.put("/:id", updateTeam);
teamRouter.delete("/:id", deleteTeam);

module.exports = teamRouter;
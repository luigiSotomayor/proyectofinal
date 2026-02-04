import { getTeams, getTeam, postTeam, updateTeam, deleteTeam } from '../controllers/team.js';

import express from 'express';
const teamRouter = express.Router();

teamRouter.get("/", getTeams);
teamRouter.get("/:id", getTeam);
teamRouter.post("/", postTeam);
teamRouter.put("/:id", updateTeam);
teamRouter.delete("/:id", deleteTeam);

export default teamRouter;
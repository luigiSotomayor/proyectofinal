import { getTeams, getTeam, getTeamByUserId, getTeamByCoachId, postTeam, updateTeam, deleteTeam } from '../controllers/team.js';
import isAuth from '../../middlewares/isAuth.js';
import hasRole from '../../middlewares/hasRole.js';
import canAccessTeam from '../../middlewares/canAccessTeam.js';

import express from 'express';
const teamRouter = express.Router();

teamRouter.get("/", isAuth, getTeams);
teamRouter.get("/:id", isAuth, canAccessTeam, getTeam);
teamRouter.get("/user/:userId", isAuth, getTeamByUserId);
teamRouter.get("/coach/:coachId", isAuth, getTeamByCoachId);
teamRouter.post("/", isAuth, hasRole(["director deportivo"]), postTeam);
teamRouter.put("/:id", isAuth, hasRole(["director deportivo"]), updateTeam);
teamRouter.delete("/:id", isAuth, hasRole(["director deportivo"]), deleteTeam);

export default teamRouter;
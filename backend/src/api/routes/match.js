import { getMatches, getMatchesByTeam, getMatch, postMatch, updateMatch, deleteMatch } from '../controllers/match.js';
import isAuth from '../../middlewares/isAuth.js';
import hasRole from '../../middlewares/hasRole.js';
import canAccessTeam from '../../middlewares/canAccessTeam.js';
import canAccessUpdateTeam from '../../middlewares/canAccessUpdateTeam.js';

import express from 'express';
const matchRouter = express.Router();

matchRouter.get("/", isAuth, hasRole(["director deportivo"]), getMatches);
matchRouter.get("/team/:teamId", isAuth, canAccessTeam, getMatchesByTeam);
matchRouter.get("/:id", isAuth, canAccessTeam, getMatch);
matchRouter.post("/", isAuth, hasRole(["director deportivo"]), postMatch);
matchRouter.put("/:id", isAuth, canAccessUpdateTeam, updateMatch);
matchRouter.delete("/:id", isAuth, hasRole(["director deportivo"]), deleteMatch);

export default matchRouter;
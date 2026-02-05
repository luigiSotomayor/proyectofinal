import { getMatches, getMatch, postMatch, updateMatch, deleteMatch } from '../controllers/match.js';
import isAuth from '../../middlewares/isAuth.js';
import hasRole from '../../middlewares/hasRole.js';

import express from 'express';
const matchRouter = express.Router();

matchRouter.get("/", isAuth, getMatches);
matchRouter.get("/:id", isAuth, getMatch);
matchRouter.post("/", isAuth, hasRole(["director deportivo", "entrenador"]), postMatch);
matchRouter.put("/:id", isAuth, hasRole(["director deportivo", "entrenador"]), updateMatch);
matchRouter.delete("/:id", isAuth, hasRole(["director deportivo", "entrenador"]), deleteMatch);

export default matchRouter;
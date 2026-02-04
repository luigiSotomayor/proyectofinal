import { getMatches, getMatch, postMatch, updateMatch, deleteMatch } from '../controllers/match.js';

import express from 'express';
const matchRouter = express.Router();

matchRouter.get("/", getMatches);
matchRouter.get("/:id", getMatch);
matchRouter.post("/", postMatch);
matchRouter.put("/:id", updateMatch);
matchRouter.delete("/:id", deleteMatch);

export default matchRouter;
const { getMatches, getMatch, postMatch, updateMatch, deleteMatch } = require('../controllers/match');

const matchRouter = require('express').Router();

matchRouter.get("/", getMatches);
matchRouter.get("/:id", getMatch);
matchRouter.post("/", postMatch);
matchRouter.put("/:id", updateMatch);
matchRouter.delete("/:id", deleteMatch);

module.exports = matchRouter;
const { getUsers, getUser, postUser, updateUser, deleteUser, login } = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", postUser); 
userRouter.post("/login", login);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
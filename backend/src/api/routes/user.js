import { getUsers, getUser, postUser, updateUser, deleteUser, login } from '../controllers/user.js';
import isAuth from '../../middlewares/isAuth.js';
import hasRole from '../../middlewares/hasRole.js';

import express from 'express';
const userRouter = express.Router();

userRouter.get("/", isAuth, hasRole["director deportivo"], getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", postUser); 
userRouter.post("/login", login);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
import { getUsers, getUser, postUser, updateUser, deleteUser, login } from '../controllers/user.js';
import isAuth from '../../middlewares/isAuth.js';
import hasRole from '../../middlewares/hasRole.js';

import express from 'express';
const userRouter = express.Router();

userRouter.get("/", isAuth, hasRole(["director deportivo"]), getUsers);
userRouter.get("/:id", isAuth, getUser);
userRouter.post("/", isAuth, hasRole(["director deportivo"]), postUser); 
userRouter.post("/login", login);
userRouter.put("/:id", isAuth, hasRole(["director deportivo"]), updateUser);
userRouter.delete("/:id", isAuth, hasRole(["director deportivo"]), deleteUser);

export default userRouter;
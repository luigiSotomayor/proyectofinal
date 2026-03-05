import { generateSign } from "../../utils/jwt.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ lastName: 1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error al obtener los usuarios");
  }
};

const getUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.params;
    const usersByRole = await User.find({ role }).sort({ lastName: 1 });
    return res.status(200).json(usersByRole);
  } catch (error) {
    return res.status(400).json("Error al obtener los usuarios por rol", error);
  }
} 

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newUser = await User.findById(id);
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(400).json("Error al obtener el usuario");
    }
}

const postUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newUser.userCode = crypto.randomUUID();

    const userDuplicated = await User.findOne({ email: req.body.email });
    if (userDuplicated) {
      return res.status(409).json("El email ya está en uso");
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Los datos introducidos no son correctos");
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json("Los datos introducidos no son correctos");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error al iniciar sesión");
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = new User(req.body);
    newUser._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json("Error al actualizar el usuario");
  }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        return res.status(200).json("Usuario eliminado");
    } catch (error) {
        return res.status(400).json("Error al borrar el usuario");
    }
}

export {
    getUsers,
    getUsersByRole,
    getUser,
    postUser,
    updateUser,
    deleteUser,
    login
}
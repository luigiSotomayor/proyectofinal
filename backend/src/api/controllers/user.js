import User from "../models/user.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error al obtener los usuarios");
  }
};

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

    const userDuplicated = await User.findOne({ email: req.body.email });
    if (userDuplicated) {
      return res.status(400).json("El email ya está en uso");
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json("Error al crear el usuario");
  }
};

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
    getUser,
    postUser,
    updateUser,
    deleteUser
}
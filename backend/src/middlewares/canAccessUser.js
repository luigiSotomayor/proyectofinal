const canAccessUser = (req, res, next) => {
  const loggedUser = req.user;
  const targetUserId = req.params.id;

  // Director deportivo puede acceder a cualquiera
  if (loggedUser.role === "director deportivo") {
    return next();
  }

  // El propio usuario puede acceder a sus datos
  if (loggedUser._id.toString() === targetUserId) {
    return next();
  }

  return res.status(401).json("Sin permiso para acceder a este usuario");
};

export default canAccessUser;

const hasRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json("Not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json("Access denied");
    }

    next();
  };
};

export default hasRole;

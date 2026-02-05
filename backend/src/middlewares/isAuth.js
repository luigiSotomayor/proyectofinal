import User from "../api/models/user.js";
import { verifySign } from "../utils/jwt.js";

const isAuth = async(req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(" ");
        const { id } = verifySign(token);

        const user = await User.findById(id);

        user.password = null;
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json("Unauthorized");
    }
}

export default isAuth;
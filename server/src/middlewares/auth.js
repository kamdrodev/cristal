import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkIfUserExists = async (req, res, next) => {
    const users = await User.find({ email: req.body.email });
    if (users.length > 0) {
        const customError = new Error("Email is already used");
        customError.status = 403;
        return next(customError);
    } else {
        return next();
    }
};

const jwtVerify = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].replace("Bearer ", "");
        const user = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        return next();
    } catch (e) {
        const customError = new Error("You are not authorized");
        customError.status = 401;
        next(customError);
    }
};

const auth = {
    checkIfUserExists,
    jwtVerify,
};

export default auth;

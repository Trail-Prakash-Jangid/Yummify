import config from "../config.js";
import jwt from "jsonwebtoken";

export const userMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("🔒 Inside userMiddleware");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ errors: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
        req.userId = decoded.id; // Now available in routes like updateRecipe
        next();
    } catch (error) {
        console.log("Invalid token or expired", error);
        return res.status(400).json({ errors: "Invalid token or expired" });
    }
};





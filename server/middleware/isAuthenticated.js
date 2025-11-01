import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    let decoded;

    // Verify token
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Access token has expired",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Access token is invalid",
      });
    }

    // Find user by decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Attach user to request for downstream routes
    req.user = user
    req.id = user;
    next();

  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//=====================Admin==================================
export const isAdmin = async(req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    return res.status(403).json({
      message: "Access denied: Admin only"
    })
  }
}

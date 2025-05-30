import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-pwd");
      next();
    }
  } catch (err) {
    res.status(401).json({ msg: "Not authorized" });
  }
};

//MiddleWare for admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Access denied" });
  }
};

export { protect, adminOnly };

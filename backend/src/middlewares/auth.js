import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "unautherized user" });

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) {
    return res
      .status(401)
      .json({ message: "unautherized user - invalid token" });
  }
  const { id } = decodedData;
  const user = await User.findById(id);
  if (user) {
    req.user = user;
    next();
  }
};

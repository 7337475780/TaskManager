import express, { Router } from "express";
import { upload } from "../middlewares/uploadMiddleWare.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleWare.js";

const router = Router();

//Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/upload-img", upload.single("img"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file Uploaded" });
  }
  const imgUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imgUrl });
});

export default router;

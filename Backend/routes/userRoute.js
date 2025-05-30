import express, { Router } from "express";
import { adminOnly, protect } from "../middlewares/authMiddleWare.js";
import { getUserById, getUsers } from "../controllers/userController.js";

const router = Router();

//User Routes
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);

export default router;

import express, { Router } from "express";
import { protect, adminOnly } from "../middlewares/authMiddleWare.js";
import {
  exportTasksReport,
  exportUsersReport,
} from "../controllers/reportController.js";

const router = Router();

//Export all tasks
router.get("/export/tasks", protect, adminOnly, exportTasksReport);
router.get("/export/users", protect, adminOnly, exportUsersReport);

export default router;

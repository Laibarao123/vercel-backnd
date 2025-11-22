import express from "express";
import {
  getUserAchievements,
  getUserStats,
  createAchievement,
  getUserLevelAndXP,
} from "../controllers/achievementController.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User routes (protected)
router.get("/", authMiddleware, getUserAchievements);
router.get("/stats", authMiddleware, getUserStats);
router.get("/level", authMiddleware, getUserLevelAndXP);

// Admin routes (protected + admin only)
router.post("/create", authMiddleware, adminMiddleware, createAchievement);

export default router;
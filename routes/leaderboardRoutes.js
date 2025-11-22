import express from "express";
import {
  getLeaderboard,
  addLeaderboardEntry,
  updateLeaderboardEntry,
  deleteLeaderboardEntry,
} from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", getLeaderboard);
router.post("/", addLeaderboardEntry);
router.put("/:id", updateLeaderboardEntry);
router.delete("/:id", deleteLeaderboardEntry);

export default router;

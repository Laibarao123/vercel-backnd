

// import express from "express";
// import { 
//   saveResult, 
//   getUserResults, 
//   getAllResults,
//   getUserQuizHistory,
//   getQuizAttemptDetails,
//   deleteQuizAttempt,
//   getQuizStats
// } from "../controllers/resultController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// // ============== Existing Routes ==============
// // Save a new quiz result
// router.post("/save", authMiddleware, saveResult);

// // Get results of the logged-in user
// router.get("/user", authMiddleware, getUserResults);

// // Get all player results for leaderboard
// router.get("/all", getAllResults); // no auth needed for public leaderboard

// // ============== New Routes for Quiz History ==============
// // Get all quiz attempts/history for logged-in user
// router.get("/history", authMiddleware, getUserQuizHistory);

// // Get single attempt details with questions
// router.get("/attempt/:attemptId", authMiddleware, getQuizAttemptDetails);

// // Delete a quiz attempt
// router.delete("/attempt/:attemptId", authMiddleware, deleteQuizAttempt);

// // Get user stats (total quizzes, avg score, etc.)
// router.get("/stats", authMiddleware, getQuizStats);

// export default router;


























import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  saveQuizResult,   // ⬅ Replaced saveResult with saveQuizResult
  getUserResults,
  getAllResults,
  getUserQuizHistory,
  getQuizAttemptDetails,
  deleteQuizAttempt,
  getQuizStats
} from "../controllers/resultController.js";

const router = express.Router();

// Save a new quiz result + Achievement tracking
router.post("/save", authMiddleware, saveQuizResult);

// Get results of logged-in user
router.get("/user", authMiddleware, getUserResults);

// Public leaderboard (no auth required)
router.get("/all", getAllResults);

// Full quiz history of logged-in user
router.get("/history", authMiddleware, getUserQuizHistory);

// Single attempt details
router.get("/attempt/:attemptId", authMiddleware, getQuizAttemptDetails);

// Delete attempt
router.delete("/attempt/:attemptId", authMiddleware, deleteQuizAttempt);

// User stats breakdown
router.get("/stats", authMiddleware, getQuizStats);

export default router;

import express from "express";
import { getLogs, getLogsByQuiz } from "../controllers/activityLogController.js";

const router = express.Router();

// @route   GET /api/logs
// @desc    Get all activity logs
// @access  Public or protected (depending on your auth)
router.get("/", getLogs);

// @route   GET /api/logs/quiz/:quizId
// @desc    Get all logs related to a specific quiz
// @access  Public or protected
router.get("/quiz/:quizId", getLogsByQuiz);

export default router;

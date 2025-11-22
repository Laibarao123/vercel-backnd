import express from "express";
import { getAllForModeration, updateQuizStatus } from "../controllers/moderationController.js";

const router = express.Router();

// Admin: view all quizzes (any status)
router.get("/", getAllForModeration);

// Admin: update moderation status
router.put("/:quizId/status", updateQuizStatus);

export default router;

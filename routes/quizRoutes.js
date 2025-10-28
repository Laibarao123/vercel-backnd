
import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById, // <-- new one
  deleteQuiz,
  deleteQuestion,
  updateQuestion,
  updateQuiz,

} from "../controllers/quizController.js";

const router = express.Router();

// Create a quiz
router.post("/createquiz", createQuiz);

// Get all quizzes
router.get("/", getQuizzes);


router.get("/:quizId", getQuizById); // <-- add this

// Delete a quiz
router.delete("/:quizId", deleteQuiz);

// Update full quiz
router.put("/:quizId", updateQuiz);

// Delete a specific question
router.delete("/:quizId/questions/:questionIndex", deleteQuestion);

// Update a specific question
router.put("/:quizId/questions/:questionIndex", updateQuestion);

export default router;

// import express from "express";
// import { addFeedback, getFeedbacks } from "../controllers/feedbackController.js";

// const router = express.Router();

// // POST /api/feedbacks  →  Add feedback (no auth)
// router.post("/", addFeedback);

// // GET /api/feedbacks  →  Get all feedbacks (no auth)
// router.get("/", getFeedbacks);

// export default router;
import express from "express";
import {
  addFeedback,
  getFeedbacks,
  deleteFeedback,
  replyFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

// POST → Add new feedback
router.post("/", addFeedback);

// GET → Get all feedbacks
router.get("/", getFeedbacks);

// DELETE → Delete a feedback by ID
router.delete("/:id", deleteFeedback);

// PUT → Add or update reply to feedback
router.put("/reply/:id", replyFeedback);

export default router;

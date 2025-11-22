import Quiz from "../models/quizModel.js";

// GET all quizzes (for admin moderation view)
export const getAllForModeration = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({ success: true, quizzes });
  } catch (err) {
    console.error("GET MODERATION QUIZZES ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE moderation status
export const updateQuizStatus = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected", "Flagged", "Pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { status },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    res.json({ success: true, message: `Quiz ${status} successfully`, quiz });
  } catch (err) {
    console.error("UPDATE QUIZ STATUS ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

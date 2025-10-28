
import Quiz from "../models/quizModel.js";

// CREATE QUIZ
export const createQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, timeLimit, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ success: false, message: "Title and questions are required" });
    }

    const quiz = new Quiz({
      title,
      description,
      category,
      difficulty,
      timeLimit,
      questions: questions.map((q) => ({
        text: q.text,
        options: q.options.map((opt, i) => ({
          text: opt,
          isCorrect: i === q.correctIndex,
        })),
      })),
    });

    await quiz.save();
    res.status(201).json({ success: true, message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error("CREATE QUIZ ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL QUIZZES
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({ success: true, quizzes });
  } catch (err) {
    console.error("GET QUIZZES ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE FULL QUIZ
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    res.json({ success: true, message: "Quiz deleted successfully" });
  } catch (err) {
    // console.error("DELETE QUIZ ERROR:", err);
    console.error("DELETE QUIZ ERROR:", err.message, err.stack);

    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE SPECIFIC QUESTION
export const deleteQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    const index = parseInt(req.params.questionIndex, 10);
    if (isNaN(index) || index < 0 || index >= quiz.questions.length) {
      return res.status(400).json({ success: false, message: "Invalid question index" });
    }

    quiz.questions.splice(index, 1);
    quiz.markModified("questions");
    await quiz.save();

    res.json({ success: true, message: "Question deleted successfully", quiz });
  } catch (err) {
    console.error("DELETE QUESTION ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE SPECIFIC QUESTION
export const updateQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    const index = parseInt(req.params.questionIndex, 10);
    if (isNaN(index) || index < 0 || index >= quiz.questions.length) {
      return res.status(400).json({ success: false, message: "Invalid question index" });
    }

    const { text, options } = req.body;
    if (!text || !options || options.length === 0) {
      return res.status(400).json({ success: false, message: "Question text and options are required" });
    }

    quiz.questions[index] = { text, options };
    quiz.markModified("questions");
    await quiz.save();

    res.json({ success: true, message: "Question updated successfully", quiz });
  } catch (err) {
    console.error("UPDATE QUESTION ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// UPDATE WHOLE QUIZ (for edits or deleting questions)
export const updateQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, timeLimit, questions } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      {
        title,
        description,
        category,
        difficulty,
        timeLimit,
        questions: questions.map((q) => ({
          text: q.text,
          options: q.options.map((opt, i) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
          })),
        })),
      },
      { new: true }
    );

    if (!updatedQuiz)
      return res.status(404).json({ success: false, message: "Quiz not found" });

    res.json({ success: true, message: "Quiz updated successfully", quiz: updatedQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// GET SINGLE QUIZ BY ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    res.json({ success: true, quiz });
  } catch (err) {
    console.error("GET QUIZ BY ID ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

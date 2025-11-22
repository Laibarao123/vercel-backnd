import ActivityLog from "../models/activityLogModel.js";

// CREATE LOG
export const createLog = async ({ action, user, quizId, questionIndex, details }) => {
  try {
    const log = new ActivityLog({ action, user, quizId, questionIndex, details });
    await log.save();
    return log;
  } catch (err) {
    console.error("CREATE LOG ERROR:", err);
  }
};

// GET ALL LOGS
export const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 });
    res.json({ success: true, logs });
  } catch (err) {
    console.error("GET LOGS ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET LOGS BY QUIZ ID
export const getLogsByQuiz = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ quizId: req.params.quizId }).sort({ createdAt: -1 });
    res.json({ success: true, logs });
  } catch (err) {
    console.error("GET LOGS BY QUIZ ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

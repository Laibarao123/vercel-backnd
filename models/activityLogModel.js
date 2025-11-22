import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g., "CREATE_QUIZ"
    user: { type: String }, // optional, track user email or ID
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }, // related quiz
    questionIndex: { type: Number }, // optional, for question updates/deletes
    details: { type: Object }, // optional extra info
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;

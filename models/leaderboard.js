import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    quizTitle: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number },
  },
  { timestamps: true }
);

leaderboardSchema.pre("save", function (next) {
  this.percentage = (this.score / this.totalQuestions) * 100;
  next();
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;

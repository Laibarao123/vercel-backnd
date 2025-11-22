import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    achievementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["locked", "in_progress", "unlocked"],
      default: "locked",
    },
    date_earned: {
      type: Date,
      default: null,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound index to ensure one record per user per achievement
userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

const UserAchievement = mongoose.model("UserAchievement", userAchievementSchema);

export default UserAchievement;
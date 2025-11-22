import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Speed", "Consistency", "Performance", "Knowledge", "Community"],
    },
    xp_reward: {
      type: Number,
      required: true,
      default: 0,
    },
    target: {
      type: Number,
      required: true,
      default: 1,
    },
    icon: {
      type: String,
      default: "trophy",
    },
    tier: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum"],
      default: "bronze",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
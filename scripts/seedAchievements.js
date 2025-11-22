import mongoose from "mongoose";
import dotenv from "dotenv";
import Achievement from "../models/Achievement.js";

dotenv.config();

const defaultAchievements = [
  {
    title: "Speed Demon",
    description: "Answer 10 questions in under 2 seconds each.",
    category: "Speed",
    xp_reward: 50,
    target: 10,
  },
  {
    title: "Daily Streak",
    description: "Play quizzes for 7 consecutive days.",
    category: "Consistency",
    xp_reward: 100,
    target: 7,
  },
  {
    title: "Quiz Master",
    description: "Score 100% in 5 different quizzes.",
    category: "Performance",
    xp_reward: 150,
    target: 5,
  },
  {
    title: "Science Genius",
    description: "Complete 5 quizzes in Science category.",
    category: "Knowledge",
    xp_reward: 75,
    target: 5,
  },
  {
    title: "Challenge Accepted",
    description: "Win 5 friend duels in Challenge Mode.",
    category: "Community",
    xp_reward: 120,
    target: 5,
  },
  {
    title: "First Steps",
    description: "Complete your first quiz.",
    category: "Performance",
    xp_reward: 25,
    target: 1,
  },
  {
    title: "Quick Learner",
    description: "Answer 50 questions correctly.",
    category: "Performance",
    xp_reward: 100,
    target: 50,
  },
  {
    title: "Social Butterfly",
    description: "Invite 10 friends to join QuizArena.",
    category: "Community",
    xp_reward: 200,
    target: 10,
  },
];

const seedAchievements = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing achievements
    await Achievement.deleteMany({});
    console.log("🗑️  Cleared existing achievements");

    // Insert default achievements
    await Achievement.insertMany(defaultAchievements);
    console.log("✅ Seeded default achievements");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding achievements:", error);
    process.exit(1);
  }
};

seedAchievements();
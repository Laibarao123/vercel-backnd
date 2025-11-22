import Achievement from "../models/Achievement.js";
import UserAchievement from "../models/UserAchievement.js";
import User from "../models/userModel.js";

// Get all achievements with user progress
export const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

    // Get all achievements
    const achievements = await Achievement.find({ isActive: true });

    // Get user's progress for each achievement
    const userProgress = await UserAchievement.find({ userId });

    // Map achievements with user progress
    const achievementsWithProgress = achievements.map((achievement) => {
      const progress = userProgress.find(
        (up) => up.achievementId.toString() === achievement._id.toString()
      );

      return {
        id: achievement._id,
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        xp_reward: achievement.xp_reward,
        target: achievement.target,
        status: progress?.status || "locked",
        progress: progress?.progress || 0,
        date_earned: progress?.date_earned || null,
      };
    });

    res.status(200).json({
      success: true,
      data: achievementsWithProgress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching achievements",
      error: error.message,
    });
  }
};

// Get user stats for analytics
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user achievements
    const userAchievements = await UserAchievement.find({ userId }).populate(
      "achievementId"
    );

    // Calculate stats by category
    const statsByCategory = {
      Speed: [],
      Consistency: [],
      Performance: [],
      Knowledge: [],
      Community: [],
    };

    userAchievements.forEach((ua) => {
      const category = ua.achievementId.category;
      if (statsByCategory[category]) {
        statsByCategory[category].push({
          progress: ua.progress,
          target: ua.achievementId.target,
          status: ua.status,
        });
      }
    });

    // Calculate percentages
    const calculateAvgProgress = (categoryData) => {
      if (categoryData.length === 0) return 0;
      const totalProgress = categoryData.reduce(
        (sum, item) => sum + (item.progress / item.target) * 100,
        0
      );
      return Math.round(totalProgress / categoryData.length);
    };

    const stats = {
      speedPct: calculateAvgProgress(statsByCategory.Speed),
      consistencyPct: calculateAvgProgress(statsByCategory.Consistency),
      performancePct: calculateAvgProgress(statsByCategory.Performance),
      knowledgePct: calculateAvgProgress(statsByCategory.Knowledge),
      communityPct: calculateAvgProgress(statsByCategory.Community),
      totalAchievements: userAchievements.length,
      earnedXP: userAchievements
        .filter((ua) => ua.status === "unlocked")
        .reduce((sum, ua) => sum + ua.achievementId.xp_reward, 0),
      unlockedCount: userAchievements.filter((ua) => ua.status === "unlocked")
        .length,
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user stats",
      error: error.message,
    });
  }
};

// Update achievement progress (called by other controllers)
export const updateAchievementProgress = async (
  userId,
  achievementTitle,
  incrementBy = 1
) => {
  try {
    // Find the achievement by title
    const achievement = await Achievement.findOne({ title: achievementTitle });
    if (!achievement) return null;

    // Find or create user achievement record
    let userAchievement = await UserAchievement.findOne({
      userId,
      achievementId: achievement._id,
    });

    if (!userAchievement) {
      userAchievement = new UserAchievement({
        userId,
        achievementId: achievement._id,
        progress: 0,
        status: "locked",
      });
    }

    // Update progress
    userAchievement.progress = Math.min(
      userAchievement.progress + incrementBy,
      achievement.target
    );

    // Check if achievement is unlocked
    if (
      userAchievement.progress >= achievement.target &&
      userAchievement.status !== "unlocked"
    ) {
      userAchievement.status = "unlocked";
      userAchievement.date_earned = new Date();

      // Update user's XP and level
      const user = await User.findById(userId);
      if (user) {
        user.xp = (user.xp || 0) + achievement.xp_reward;
        user.level = Math.floor(user.xp / 500) + 1; // 500 XP per level
        await user.save();
      }

      await userAchievement.save();
      return {
        unlocked: true,
        achievement: {
          title: achievement.title,
          xp_reward: achievement.xp_reward,
        },
      };
    } else if (userAchievement.progress > 0) {
      userAchievement.status = "in_progress";
    }

    await userAchievement.save();
    return { unlocked: false };
  } catch (error) {
    console.error("Error updating achievement:", error);
    return null;
  }
};

// Admin: Create new achievement
export const createAchievement = async (req, res) => {
  try {
    const { title, description, category, xp_reward, target } = req.body;

    const achievement = new Achievement({
      title,
      description,
      category,
      xp_reward,
      target,
    });

    await achievement.save();

    res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating achievement",
      error: error.message,
    });
  }
};

// Get user level and XP
export const getUserLevelAndXP = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("xp level");

    res.status(200).json({
      success: true,
      data: {
        level: user.level || 1,
        xp: user.xp || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user level",
      error: error.message,
    });
  }
};
import { updateAchievementProgress } from "../controllers/achievementController.js";

/**
 * Track achievements after quiz completion
 * Call this function in your quiz result controller
 */
export const trackQuizAchievements = async (userId, quizResult) => {
  try {
    const unlockedAchievements = [];

    // Track: First quiz completion
    if (quizResult.isFirstQuiz) {
      const result = await updateAchievementProgress(userId, "First Steps", 1);
      if (result?.unlocked) unlockedAchievements.push(result.achievement);
    }

    // Track: Perfect score (100%)
    if (quizResult.score === 100) {
      const result = await updateAchievementProgress(userId, "Quiz Master", 1);
      if (result?.unlocked) unlockedAchievements.push(result.achievement);
    }

    // Track: Speed achievement (if avg time < 2 seconds per question)
    if (quizResult.avgTimePerQuestion < 2000) {
      const result = await updateAchievementProgress(
        userId,
        "Speed Demon",
        quizResult.totalQuestions
      );
      if (result?.unlocked) unlockedAchievements.push(result.achievement);
    }

    // Track: Category-specific achievements
    if (quizResult.category === "Science") {
      const result = await updateAchievementProgress(userId, "Science Genius", 1);
      if (result?.unlocked) unlockedAchievements.push(result.achievement);
    }

    // Track: Correct answers
    if (quizResult.correctAnswers > 0) {
      const result = await updateAchievementProgress(
        userId,
        "Quick Learner",
        quizResult.correctAnswers
      );
      if (result?.unlocked) unlockedAchievements.push(result.achievement);
    }

    return unlockedAchievements;
  } catch (error) {
    console.error("Error tracking achievements:", error);
    return [];
  }
};

/**
 * Track daily streak achievement
 * Call this when user logs in or completes a quiz
 */
export const trackDailyStreak = async (userId, consecutiveDays) => {
  try {
    const result = await updateAchievementProgress(
      userId,
      "Daily Streak",
      consecutiveDays
    );
    return result?.unlocked ? [result.achievement] : [];
  } catch (error) {
    console.error("Error tracking daily streak:", error);
    return [];
  }
};

/**
 * Track community achievements
 * Call this when user invites friends or wins duels
 */
export const trackCommunityAchievements = async (userId, eventType) => {
  try {
    const unlockedAchievements = [];

    if (eventType === "invite") {
      const result = await updateAchievementProgress(
        userId,
        "Social Butterfly",
        1
      );
      if (result?.unlocked) unlockedAchievements.push(result.achievement);
    }

    if (eventType === "duel_win") {
      const result = await updateAchievementProgress(
        userId,
        "Challenge Accepted",
        1
      );
      if (result?.unlocked) unlockedAchievements.push(result.achievement);
    }

    return unlockedAchievements;
  } catch (error) {
    console.error("Error tracking community achievements:", error);
    return [];
  }
};
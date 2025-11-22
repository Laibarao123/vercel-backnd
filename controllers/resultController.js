
// import Result from "../models/resultModel.js";
// import User from "../models/userModel.js";
// import Quiz from "../models/quizModel.js";
// import { trackQuizAchievements } from "../utils/achievementTracker.js";

// // ============== Existing Functions ==============

// // Save result with JWT user
// export const saveResult = async (req, res) => {
//   try {
//     const { quizTitle, totalQuestions, correctAnswers, wrongAnswers, score, accuracy } = req.body;

//     const filter = { user: req.user._id, quizTitle };

//     const update = {
//       $set: {
//         name: req.user.name,
//         email: req.user.email,
//         totalQuestions,
//         correctAnswers,
//         wrongAnswers,
//         score,
//         accuracy,
//         lastAttemptAt: new Date(),
//       },
//       $inc: { attempts: 1 },
//       $max: { bestScore: score },
//     };

//     const options = { new: true, upsert: true, setDefaultsOnInsert: true };

//     const result = await Result.findOneAndUpdate(filter, update, options);

//     res.status(200).json({
//       success: true,
//       message: "Result saved/updated successfully!",
//       result,
//     });

//   } catch (error) {
//     console.error("❌ Error saving/updating result:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error saving/updating result",
//       error: error.message,
//     });
//   }
// };

// // Get results of logged-in user
// export const getUserResults = async (req, res) => {
//   try {
//     const results = await Result.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, results });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user results",
//       error: error.message,
//     });
//   }
// };

// // Get all results of all players (no duplicates)
// export const getAllResults = async (req, res) => {
//   try {
//     const allResults = await Result.find()
//       .sort({ score: -1, createdAt: -1 })
//       .select("-__v");

//     // Remove duplicates by user (keep highest score only)
//     const uniqueResultsMap = new Map();
//     allResults.forEach((r) => {
//       if (!uniqueResultsMap.has(r.email)) {
//         uniqueResultsMap.set(r.email, r);
//       }
//     });

//     const uniqueResults = Array.from(uniqueResultsMap.values());

//     res.status(200).json({ success: true, results: uniqueResults });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching all results",
//       error: error.message,
//     });
//   }
// };

// // ============== New Functions for Quiz History ==============

// // Get all quiz attempts for user (with detailed history)
// export const getUserQuizHistory = async (req, res) => {
//   try {
//     const userId = req.user._id; // from authMiddleware
    
//     // Try to find results using both 'user' and 'user_id' fields
//     // This makes it compatible with your existing schema
//     const results = await Result.find({
//       $or: [
//         { user: userId },
//         { user_id: userId }
//       ]
//     })
//       .populate('quiz_id', 'title category')
//       .sort({ lastAttemptAt: -1, createdAt: -1 });

//     const formattedResults = results.map(result => ({
//       attempt_id: result._id,
//       quiz_id: result.quiz_id?._id || null,
//       quiz_title: result.quizTitle || result.quiz_id?.title || 'Unknown Quiz',
//       date: result.lastAttemptAt || result.createdAt,
//       score: result.score || result.bestScore || 0,
//       total_questions: result.totalQuestions || 0,
//       correct: result.correctAnswers || 0,
//       time_taken_sec: result.time_taken || 0,
//       mode: result.mode || 'practice',
//       rank: result.rank || null,
//       players_total: result.total_players || null,
//       earned_xp: result.xp_earned || 0,
//       badges: result.badges || [],
//       questions: result.questions || [],
//       attempts: result.attempts || 1,
//       accuracy: result.accuracy || 0
//     }));

//     res.status(200).json({
//       success: true,
//       data: formattedResults
//     });
//   } catch (error) {
//     console.error('Error in getUserQuizHistory:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // Get single attempt details
// export const getQuizAttemptDetails = async (req, res) => {
//   try {
//     const { attemptId } = req.params;
//     const userId = req.user._id;

//     const result = await Result.findOne({
//       _id: attemptId,
//       $or: [
//         { user: userId },
//         { user_id: userId }
//       ]
//     }).populate('quiz_id');

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Attempt not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         attempt_id: result._id,
//         quiz_id: result.quiz_id?._id || null,
//         quiz_title: result.quizTitle || result.quiz_id?.title || 'Unknown Quiz',
//         date: result.lastAttemptAt || result.createdAt,
//         score: result.score || result.bestScore || 0,
//         total_questions: result.totalQuestions || 0,
//         correct: result.correctAnswers || 0,
//         time_taken_sec: result.time_taken || 0,
//         mode: result.mode || 'practice',
//         rank: result.rank || null,
//         players_total: result.total_players || null,
//         earned_xp: result.xp_earned || 0,
//         badges: result.badges || [],
//         questions: result.questions || [],
//         attempts: result.attempts || 1,
//         accuracy: result.accuracy || 0,
//         name: result.name,
//         email: result.email
//       }
//     });
//   } catch (error) {
//     console.error('Error in getQuizAttemptDetails:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // Delete quiz attempt
// export const deleteQuizAttempt = async (req, res) => {
//   try {
//     const { attemptId } = req.params;
//     const userId = req.user._id;

//     const result = await Result.findOneAndDelete({
//       _id: attemptId,
//       $or: [
//         { user: userId },
//         { user_id: userId }
//       ]
//     });

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Attempt not found or you don't have permission to delete it"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Attempt deleted successfully"
//     });
//   } catch (error) {
//     console.error('Error in deleteQuizAttempt:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // Get user stats
// export const getQuizStats = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const results = await Result.find({
//       $or: [
//         { user: userId },
//         { user_id: userId }
//       ]
//     });

//     const stats = {
//       total: results.length,
//       avgScore: results.length > 0 
//         ? Math.round(results.reduce((sum, r) => sum + (r.score || r.bestScore || 0), 0) / results.length)
//         : 0,
//       best: results.length > 0 
//         ? Math.max(...results.map(r => r.score || r.bestScore || 0))
//         : 0,
//       totalXP: results.reduce((sum, r) => sum + (r.xp_earned || 0), 0),
//       totalAttempts: results.reduce((sum, r) => sum + (r.attempts || 1), 0)
//     };

//     res.status(200).json({
//       success: true,
//       data: stats
//     });
//   } catch (error) {
//     console.error('Error in getQuizStats:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };



















import Result from "../models/resultModel.js";
import { trackQuizAchievements } from "../utils/achievementTracker.js";

// ============== Save result and track achievements ==============
export const saveQuizResult = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const {
      quizId,
      quizTitle,
      score,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      timeTaken,
      category,
      mode,
    } = req.body;

    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    const newResult = new Result({
      user: userId,
      quiz_id: quizId,
      quizTitle,
      score,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      time_taken: timeTaken,
      category,
      mode,
      accuracy,
      name: req.user.name,
      email: req.user.email,
      lastAttemptAt: new Date(),
    });

    await newResult.save();

    // Count total attempts to check first quiz
    const previousResults = await Result.countDocuments({ user: userId });
    const isFirstQuiz = previousResults === 1;

    const avgTimePerQuestion = timeTaken / totalQuestions;

    // Unlock achievements
    const unlockedAchievements = await trackQuizAchievements(userId, {
      score,
      correctAnswers,
      totalQuestions,
      avgTimePerQuestion,
      category,
      isFirstQuiz,
    });

    res.status(201).json({
      success: true,
      message: "Quiz result saved successfully!",
      data: newResult,
      unlockedAchievements,
    });

  } catch (error) {
    console.error("❌ Error saving quiz result:", error);
    res.status(500).json({
      success: false,
      message: "Error saving quiz result",
      error: error.message,
    });
  }
};

// ============== Get results for logged-in user ==============
export const getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== Leaderboard: Highest Score Per Player ==============
export const getAllResults = async (req, res) => {
  try {
    const allResults = await Result.find()
      .sort({ score: -1, createdAt: -1 })
      .select("-__v");

    const uniqueResultsMap = new Map();
    allResults.forEach(r => {
      if (!uniqueResultsMap.has(r.email)) {
        uniqueResultsMap.set(r.email, r);
      }
    });

    res.status(200).json({
      success: true,
      results: Array.from(uniqueResultsMap.values())
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== Quiz History ==============
export const getUserQuizHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await Result.find({
      $or: [{ user: userId }, { user_id: userId }]
    })
      .populate("quiz_id", "title category")
      .sort({ lastAttemptAt: -1 });

    res.status(200).json({
      success: true,
      data: results.map(r => ({
        attempt_id: r._id,
        quiz_id: r.quiz_id?._id || null,
        quiz_title: r.quizTitle || r.quiz_id?.title,
        date: r.lastAttemptAt || r.createdAt,
        score: r.score,
        correct: r.correctAnswers,
        total_questions: r.totalQuestions,
        accuracy: r.accuracy,
        time_taken_sec: r.time_taken,
        mode: r.mode || "practice",
        attempts: r.attempts || 1
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== Attempt Details ==============
export const getQuizAttemptDetails = async (req, res) => {
  try {
    const result = await Result.findOne({
      _id: req.params.attemptId,
      $or: [
        { user: req.user._id },
        { user_id: req.user._id }
      ]
    }).populate("quiz_id");

    if (!result) {
      return res.status(404).json({ success: false, message: "Attempt not found" });
    }

    res.status(200).json({ success: true, data: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== Delete Attempt ==============
export const deleteQuizAttempt = async (req, res) => {
  try {
    const result = await Result.findOneAndDelete({
      _id: req.params.attemptId,
      user: req.user._id
    });

    if (!result)
      return res.status(404).json({
        success: false,
        message: "Attempt not found or unauthorized"
      });

    res.status(200).json({
      success: true,
      message: "Attempt deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============== Stats ==============
export const getQuizStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await Result.find({ user: userId });

    const stats = {
      total: results.length,
      avgScore: results.length
        ? Math.round(results.reduce((a, b) => a + b.score, 0) / results.length)
        : 0,
      best: results.length
        ? Math.max(...results.map(r => r.score))
        : 0,
      totalAttempts: results.reduce((sum, r) => sum + (r.attempts || 1), 0),
    };

    res.status(200).json({ success: true, data: stats });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

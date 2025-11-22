
// import mongoose from "mongoose";

// const resultSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: String,
//   email: String,
//   quizTitle: { type: String, required: true },
//   totalQuestions: Number,
//   correctAnswers: Number,
//   wrongAnswers: Number,
//   score: Number,
//   accuracy: Number,

//   // NEW FIELDS 👇
//   attempts: { type: Number, default: 0 },
//   bestScore: { type: Number, default: 0 },
//   lastAttemptAt: { type: Date },

// }, { timestamps: true });

// export default mongoose.model("Result", resultSchema);













import mongoose from "mongoose";

// Question-level result schema for detailed quiz history
const questionResultSchema = new mongoose.Schema({
  question_id: String,
  text: String,
  options: [String],
  correct_choice: Number,
  user_choice: Number,
  explanation: String,
  time_spent_sec: Number,
  category: String,
  difficulty: String
});

const resultSchema = new mongoose.Schema({
  // ============== Existing Fields ==============
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: String,
  email: String,
  quizTitle: { 
    type: String, 
    required: true 
  },
  totalQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  score: Number,
  accuracy: Number,
  attempts: { 
    type: Number, 
    default: 0 
  },
  bestScore: { 
    type: Number, 
    default: 0 
  },
  lastAttemptAt: { 
    type: Date 
  },

  // ============== New Fields for Enhanced Quiz History ==============
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },
  time_taken: {
    type: Number, // in seconds
    default: 0
  },
  mode: {
    type: String,
    enum: ['practice', 'live', 'challenge'],
    default: 'practice'
  },
  rank: {
    type: Number,
    default: null
  },
  total_players: {
    type: Number,
    default: null
  },
  xp_earned: {
    type: Number,
    default: 0
  },
  badges: {
    type: [String],
    default: []
  },
  questions: {
    type: [questionResultSchema],
    default: []
  },
  completed_at: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export default mongoose.model("Result", resultSchema);
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";

// // Route imports
// import userRouter from "./routes/userRoutes.js";
// import quizRouter from "./routes/quizRoutes.js";
// import roomRouter from "./routes/roomRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import announcementRoutes from "./routes/announcementRoutes.js";
// import resultRoutes from "./routes/resultRoutes.js";
// import roleRoutes from "./routes/roleRoutes.js";
// import leaderboardRoutes from "./routes/leaderboardRoutes.js";
// import moderationRouter from "./routes/moderationRoutes.js";
// import inviteRoutes from "./routes/inviteRoutes.js";
// import activityLogRoutes from "./routes/activityLogRoutes.js";
// import achievementRoutes from "./routes/achievementRoutes.js"; 

// import profileRoutes from "./routes/profileRoutes.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4000;

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Connect to Database
// connectDB();

// // ✅ Routes
// app.use("/api/auth", userRouter);
// app.use("/api/quiz", quizRouter);
// app.use("/api/rooms", roomRouter);
// app.use("/api/announcements", announcementRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/feedbacks", feedbackRoutes);
// app.use("/api/results", resultRoutes);
// app.use("/api/roles", roleRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);
// app.use("/api/moderation", moderationRouter);
// app.use("/api/invites", inviteRoutes);
// app.use("/api/logs", activityLogRoutes);
// app.use("/api/achievements", achievementRoutes); 
// app.use("/api/profile", profileRoutes);

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("✅ API WORKING SUCCESSFULLY");
// });

// // ✅ Start server
// app.listen(port, () => {
//   console.log(` Server running on http://localhost:${port}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Route imports
import userRouter from "./routes/userRoutes.js";
import quizRouter from "./routes/quizRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import moderationRouter from "./routes/moderationRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/announcements", announcementRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/moderation", moderationRouter);
app.use("/api/invites", inviteRoutes);
app.use("/api/logs", activityLogRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/profile", profileRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Working Successfully on Vercel");
});

// ❌ REMOVE app.listen()
// ❗ Vercel serverless = export default app

export default app;

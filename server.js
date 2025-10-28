
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import quizRouter from "./routes/quizRoutes.js"; // <-- make sure ye import hai
import roomRouter from "./routes/roomRoutes.js"; // <-- ye naya add karna hai

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Database connection
connectDB();

// ✅ Routes
app.use("/api/auth", userRouter); // login/register
app.use("/api/quiz", quizRouter); // quiz routes
app.use("/api/rooms", roomRouter); // 👈 NEW: room routes for quiz rooms

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API WORKING ✅");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});




































// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRoutes.js";
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection
// connectDB();

// // Routes
// app.use("/api/auth", userRouter); // login/register
// app.use("/api/quiz", quizRouter); // quiz routes (no auth)

// // Test route
// app.get("/", (req, res) => {
//   res.send("API WORKING");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`✅ Server running on http://localhost:${port}`);
// });

import mongoose from "mongoose";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here"; // safer default

// =======================
// REGISTER CONTROLLER
// =======================
export async function register(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // ✅ Basic Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // ✅ Create new user
    const newUserId = new mongoose.Types.ObjectId();
    // const hashedPassword = await bcrypt.hash(password, 10);
const newUser = new User({
  _id: newUserId,
  name: name.trim(),
  email: email.toLowerCase(),
  password, // plain text, schema will hash it
});


    await newUser.save();

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: newUserId.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    // ✅ Success Response
    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

// =======================
// LOGIN CONTROLLER
// =======================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // ✅ Basic Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ✅ Check for user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ✅ Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    // ✅ Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

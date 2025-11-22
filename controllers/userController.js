
import mongoose from "mongoose";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

// =======================
// REGISTER CONTROLLER
// =======================
export async function register(req, res) {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    // ✅ Basic Validation
    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields (including role) are required.",
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

    if (!["admin", "host", "player"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be admin, host, or player.",
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
    const newUser = new User({
      _id: newUserId,
      name: name.trim(),
      email: email.toLowerCase(),
      password, // schema auto-hashes
      role,
    });

    await newUser.save();

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: newUserId.toString(), role: newUser.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    // ✅ Success Response
    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
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
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    // ✅ Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
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

// =======================
// GET ALL USERS
// =======================
export async function getAllUsers(req, res) {
  try {
    const users = await User.find(
      {},
      "_id name email role createdAt"
    ).lean();

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
    });
  }
}



















// =======================
// UPDATE USER
// =======================
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name.trim();
    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
      }
      user.email = email.toLowerCase();
    }
    if (role) {
      if (!["admin", "host", "player"].includes(role)) {
        return res.status(400).json({ success: false, message: "Invalid role" });
      }
      user.role = role;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password too short" });
      }
      user.password = password; // pre-save hook hashes automatically
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// =======================
// DELETE USER
// =======================
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}













// new
// Get current logged-in user
export async function getCurrentUser(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user, // attached by authMiddleware
  });
}

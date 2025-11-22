import express from "express";
import { getProfileController, saveProfileController } from "../controllers/profileController.js";

const router = express.Router();

// Save profile
router.post("/", saveProfileController);

// Get profile by username
router.get("/:username", getProfileController);

export default router;

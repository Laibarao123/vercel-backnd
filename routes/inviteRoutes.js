import express from "express";
import { sendInvite } from "../controllers/inviteController.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/send", protect, sendInvite); // only logged-in host can send

export default router;
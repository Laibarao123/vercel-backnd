import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

// POST → Create new announcement
router.post("/", createAnnouncement);

// GET → Get all announcements
router.get("/", getAnnouncements);

// PUT → Update specific announcement
router.put("/:id", updateAnnouncement);

// DELETE → Delete specific announcement
router.delete("/:id", deleteAnnouncement);

export default router;

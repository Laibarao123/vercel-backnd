import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoomByCode,
  joinRoomByCode,
  startRoomByCode, // ✅ import new controller
} from "../controllers/roomController.js";

const router = express.Router();

// POST → create a new room
router.post("/", createRoom);

// GET → get all rooms
router.get("/", getAllRooms);

// GET → get single room by room code
router.get("/:code", getRoomByCode);

// POST → join room by room code
router.post("/join/:code", joinRoomByCode);

// ✅ NEW: GET → start quiz by room code
router.get("/start/:code", startRoomByCode);

export default router;




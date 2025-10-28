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












































// import express from "express";
// import {
//   createRoom,
//   getAllRooms,
//   getRoomByCode,
  
//   joinRoomByCode
// } from "../controllers/roomController.js";

// const router = express.Router();

// // POST → create a new room
// router.post("/", createRoom);

// // GET → get all rooms
// router.get("/", getAllRooms);

// // GET → get single room by room code
// router.get("/:code", getRoomByCode);

// // POST → join room by room code
// router.post("/join/:code", joinRoomByCode);

// export default router;











































































// import express from "express";
// import {
//   createRoom,
//   getAllRooms,
//   getRoomByCode,
//   joinRoomByCode,
//   startRoomQuiz
// } from "../controllers/roomController.js";

// const router = express.Router();

// // Host creates a room
// router.post("/", createRoom);

// // Get all rooms
// router.get("/", getAllRooms);

// // Get single room by code (for lobby)
// router.get("/:code", getRoomByCode);

// // Player joins a room
// router.post("/join/:code", joinRoomByCode);

// // Host starts quiz
// router.post("/start/:code", startRoomQuiz);

// export default router;






















// import express from "express";
// import {
//   createRoom,
//   getAllRooms,
//   getRoomByCode,
//   joinRoomByCode,
//   startRoomQuiz,
//   checkQuizStatus, // ✅ new
// } from "../controllers/roomController.js";

// const router = express.Router();

// // Host creates room
// router.post("/", createRoom);

// // Get all rooms
// router.get("/", getAllRooms);

// // Get single room by code
// router.get("/:code", getRoomByCode);

// // Player joins room
// router.post("/join/:code", joinRoomByCode);

// // Host starts quiz
// router.post("/start/:code", startRoomQuiz);

// // ✅ Players poll to check if host has started
// router.get("/status/:code", checkQuizStatus);

// export default router;

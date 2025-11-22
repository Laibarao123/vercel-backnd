
// import Room from "../models/roomModel.js";
// import Quiz from "../models/quizModel.js";

// // ✅ Create a new quiz room
// export const createRoom = async (req, res) => {
//   try {
//     const { name, quizId, maxPlayers, duration, visibility } = req.body;

//     // check if quiz exists
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     // generate random room code
//     const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

//     const newRoom = new Room({
//       name,
//       quiz: quizId,
//       roomCode,
//       maxPlayers,
//       duration,
//       visibility,
//       isStarted: false, // ✅ default not started
//     });

//     await newRoom.save();

//     res.status(201).json({
//       success: true,
//       message: "Room created successfully",
//       room: newRoom,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Get all rooms
// export const getAllRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find().populate("quiz", "title category");
//     res.status(200).json({ success: true, rooms });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Get single room by code
// export const getRoomByCode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const room = await Room.findOne({ roomCode: code }).populate(
//       "quiz",
//       "title category"
//     );

//     if (!room) return res.status(404).json({ message: "Room not found" });

//     res.status(200).json({ success: true, room });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Join a quiz room using room code
// export const joinRoomByCode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const { userId } = req.body;

//     const room = await Room.findOne({ roomCode: code });
//     if (!room) {
//       return res.status(404).json({ success: false, message: "Room not found" });
//     }

//     // ✅ Check if quiz has started
//     if (!room.isStarted) {
//       return res.status(400).json({ success: false, message: "Quiz has not started yet." });
//     }

//     // Check if room is active
//     if (!room.isActive) {
//       return res.status(400).json({ success: false, message: "Room is no longer active" });
//     }

//     // Check if room is full
//     if (room.participants.length >= room.maxPlayers) {
//       return res.status(400).json({ success: false, message: "Room is full" });
//     }

//     // Check if user already joined
//     const alreadyJoined = room.participants.some(
//       (p) => p.userId.toString() === userId
//     );
//     if (alreadyJoined) {
//       return res.status(400).json({ success: false, message: "User already joined this room" });
//     }

//     // Add participant
//     room.participants.push({ userId });
//     await room.save();

//     const populatedRoom = await Room.findById(room._id)
//       .populate("quiz", "title category")
//       .populate("participants.userId", "name email");

//     res.status(200).json({
//       success: true,
//       message: "Joined room successfully",
//       room: populatedRoom,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Start quiz room (host only)
// export const startRoomByCode = async (req, res) => {
//   try {
//     const { code } = req.params;

//     const room = await Room.findOne({ roomCode: code });
//     if (!room) {
//       return res.status(404).json({ success: false, message: "Room not found" });
//     }

//     if (room.isStarted) {
//       return res.status(400).json({ success: false, message: "Quiz already started" });
//     }

//     room.isStarted = true;
//     await room.save();

//     res.status(200).json({ success: true, message: "Quiz started successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };








































import Room from "../models/roomModel.js";
import Quiz from "../models/quizModel.js";

// ✅ Create a new quiz room
export const createRoom = async (req, res) => {
  try {
    const { name, quizId, maxPlayers, duration, visibility } = req.body;

    // check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // generate random room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newRoom = new Room({
      name,
      quiz: quizId,
      roomCode,
      maxPlayers,
      duration,
      visibility,
      isStarted: false, // ✅ default not started
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room: newRoom,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("quiz", "title category");
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single room by code
export const getRoomByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const room = await Room.findOne({ roomCode: code }).populate(
      "quiz",
      "title category"
    );

    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Join a quiz room using room code
export const joinRoomByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const { userId } = req.body;

    const room = await Room.findOne({ roomCode: code });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // ✅ Only allow joining if the host has started the quiz
    if (!room.isStarted) {
      return res.status(400).json({ success: false, message: "Quiz has not started yet." });
    }

    // ✅ Allow unlimited players — remove full-room check
    // ✅ Allow duplicates (optional), but we can prevent duplicates with a small check
    const alreadyJoined = room.participants.some(
      (p) => p.userId.toString() === userId
    );

    if (!alreadyJoined) {
      room.participants.push({ userId });
      await room.save();
    }

    // ✅ Populate room details before sending back
    const populatedRoom = await Room.findById(room._id)
      .populate("quiz", "title category")
      .populate("participants.userId", "name email");

    res.status(200).json({
      success: true,
      message: "Joined room successfully",
      room: populatedRoom,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


































// ✅ Start quiz room (host only)
export const startRoomByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const room = await Room.findOne({ roomCode: code });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    if (room.isStarted) {
      return res.status(400).json({ success: false, message: "Quiz already started" });
    }

    room.isStarted = true;
    await room.save();

    res.status(200).json({ success: true, message: "Quiz started successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



































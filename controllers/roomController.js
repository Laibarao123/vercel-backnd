


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
    const { code } = req.params; // Room code from URL
    const { userId } = req.body; // User ID from frontend (or decoded token)

    // Check if the room exists
    const room = await Room.findOne({ roomCode: code });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // Check if room is active
    if (!room.isActive) {
      return res.status(400).json({ success: false, message: "Room is no longer active" });
    }

    // Check if room is full
    if (room.participants.length >= room.maxPlayers) {
      return res.status(400).json({ success: false, message: "Room is full" });
    }

    // Check if user already joined
    const alreadyJoined = room.participants.some(
      (p) => p.userId.toString() === userId
    );
    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: "User already joined this room" });
    }

    // Add participant
    room.participants.push({ userId });
    await room.save();

    // Optionally populate quiz details
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

    // Already started check
    if (room.isStarted) {
      return res.status(400).json({ success: false, message: "Quiz already started" });
    }

    // Start quiz
    room.isStarted = true;
    await room.save();

    res.status(200).json({ success: true, message: "Quiz started successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


















































// import Room from "../models/roomModel.js";
// import Quiz from "../models/quizModel.js";

// // ✅ Create a new quiz room
// export const createRoom = async (req, res) => {
//   try {
//     const { name, quizId, maxPlayers, duration, visibility, hostId } = req.body;

//     // check if quiz exists
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ success: false, message: "Quiz not found" });
//     }

//     // generate random room code
//     const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

//     // ✅ Create room with host info and add host as first participant
//     const newRoom = new Room({
//       name,
//       quiz: quizId,
//       host: hostId, // ✅ host is the user creating the room
//       roomCode,
//       maxPlayers,
//       duration,
//       visibility,
//       hasStarted: false, // ✅ quiz not started yet
//       participants: [{ userId: hostId }], // ✅ host is also a participant
//       isActive: true,
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

// // ✅ Get single room by code (for lobby updates)
// export const getRoomByCode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const room = await Room.findOne({ roomCode: code })
//       .populate("quiz", "title category")
//       .populate("participants.userId", "name email");

//     if (!room) return res.status(404).json({ success: false, message: "Room not found" });

//     res.status(200).json({ success: true, room });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Player joins a room using room code
// export const joinRoomByCode = async (req, res) => {
//   try {
//     const { code } = req.params; // Room code from URL
//     const { userId } = req.body; // User ID from frontend

//     const room = await Room.findOne({ roomCode: code });
//     if (!room) {
//       return res.status(404).json({ success: false, message: "Room not found" });
//     }

//     // Check if room is active
//     if (!room.isActive) {
//       return res.status(400).json({ success: false, message: "Room is no longer active" });
//     }

//     // Check if quiz has started
//     if (room.hasStarted) {
//       return res.status(400).json({ success: false, message: "Quiz has already started" });
//     }

//     // Check if room is full
//     if (room.participants.length >= room.maxPlayers) {
//       return res.status(400).json({ success: false, message: "Room is full" });
//     }

//     // Check if user already joined
//     const alreadyJoined = room.participants.some(
//       (p) => p.userId && p.userId.toString() === userId
//     );
//     if (alreadyJoined) {
//       return res.status(400).json({ success: false, message: "User already joined this room" });
//     }

//     // Add new participant
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

// // ✅ Start quiz manually (Host Only)
// export const startRoomQuiz = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const { hostId } = req.body;

//     const room = await Room.findOne({ roomCode: code });
//     if (!room)
//       return res.status(404).json({ success: false, message: "Room not found" });

//     // ✅ Only the host can start the quiz
//     if (!room.host || room.host.toString() !== hostId) {
//       return res.status(403).json({
//         success: false,
//         message: "Only the host can start this quiz",
//       });
//     }

//     // ✅ Check if quiz already started
//     if (room.hasStarted) {
//       return res.status(400).json({
//         success: false,
//         message: "Quiz has already started",
//       });
//     }

//     // ✅ Start the quiz
//     room.hasStarted = true;
//     await room.save();

//     res.status(200).json({
//       success: true,
//       message: "Quiz started successfully!",
//       room,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };














// import Room from "../models/roomModel.js";
// import Quiz from "../models/quizModel.js";

// // ✅ Create a new quiz room
// export const createRoom = async (req, res) => {
//   try {
//     const { name, quizId, maxPlayers, duration, visibility, hostId } = req.body;

//     const quiz = await Quiz.findById(quizId);
//     if (!quiz)
//       return res.status(404).json({ success: false, message: "Quiz not found" });

//     const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

//     const newRoom = new Room({
//       name,
//       quiz: quizId,
//       host: hostId,
//       roomCode,
//       maxPlayers,
//       duration,
//       visibility,
//       hasStarted: false,
//       participants: [{ userId: hostId }],
//       isActive: true,
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
//     const room = await Room.findOne({ roomCode: code })
//       .populate("quiz", "title category")
//       .populate("participants.userId", "name email");

//     if (!room)
//       return res.status(404).json({ success: false, message: "Room not found" });

//     res.status(200).json({ success: true, room });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Join room
// export const joinRoomByCode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const { userId } = req.body;

//     const room = await Room.findOne({ roomCode: code });
//     if (!room)
//       return res.status(404).json({ success: false, message: "Room not found" });

//     if (!room.isActive)
//       return res.status(400).json({ success: false, message: "Room inactive" });

//     if (room.hasStarted)
//       return res.status(400).json({ success: false, message: "Quiz already started" });

//     if (room.participants.length >= room.maxPlayers)
//       return res.status(400).json({ success: false, message: "Room full" });

//     const alreadyJoined = room.participants.some(
//       (p) => p.userId && p.userId.toString() === userId
//     );
//     if (alreadyJoined)
//       return res.status(400).json({ success: false, message: "User already joined" });

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

// // ✅ Start quiz manually (Host Only)
// export const startRoomQuiz = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const { hostId } = req.body;

//     const room = await Room.findOne({ roomCode: code });
//     if (!room)
//       return res.status(404).json({ success: false, message: "Room not found" });

//     if (!room.host || room.host.toString() !== hostId) {
//       return res.status(403).json({
//         success: false,
//         message: "Only host can start this quiz",
//       });
//     }

//     if (room.hasStarted)
//       return res.status(400).json({
//         success: false,
//         message: "Quiz already started",
//       });

//     room.hasStarted = true;
//     await room.save();

//     res.status(200).json({
//       success: true,
//       message: "Quiz started successfully!",
//       room,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ NEW: Check quiz status (for players polling)
// export const checkQuizStatus = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const room = await Room.findOne({ roomCode: code });

//     if (!room)
//       return res.status(404).json({ success: false, message: "Room not found" });

//     res.status(200).json({
//       success: true,
//       hasStarted: room.hasStarted,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

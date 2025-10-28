import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    roomCode: { type: String, required: true, unique: true },
    maxPlayers: { type: Number, default: 10 },
    duration: { type: Number, default: 20 }, // in minutes
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    participants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;

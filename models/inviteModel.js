import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  receiverEmail: { type: String, required: true },
  quizId: { type: String, required: true },
  status: { type: String, default: "sent" },
  sentAt: { type: Date, default: Date.now },
});

const Invite = mongoose.model("Invite", inviteSchema);
export default Invite;
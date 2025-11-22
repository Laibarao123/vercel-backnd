import Invite from "../models/inviteModel.js";

export const sendInvite = async (req, res) => {
  const { receiverEmail, quizId } = req.body;
  const host = req.user; // comes from auth middleware

  if (!receiverEmail || !quizId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!host || host.role !== "host") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const invite = await Invite.create({
      senderEmail: host.email, // logged-in host
      receiverEmail,
      quizId,
      status: "sent",
    });

    return res.status(200).json({ message: "Invite sent successfully", invite });
  } catch (error) {
    console.error("Error sending invite:", error);
    return res.status(500).json({ message: "Server error sending invite" });
  }
};
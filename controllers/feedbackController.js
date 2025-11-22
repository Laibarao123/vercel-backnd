
import Feedback from "../models/feedbackModel.js";

// =======================
// ADD FEEDBACK
// =======================
export async function addFeedback(req, res) {
  try {
    const { user, message } = req.body;

    if (!user?.trim() || !message?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "User and message are required" });
    }

    const newFeedback = new Feedback({ user, message });
    await newFeedback.save();

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Add feedback error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// =======================
// GET FEEDBACKS
// =======================
export async function getFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error("Get feedback error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// =======================
// DELETE FEEDBACK
// =======================
export async function deleteFeedback(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Feedback deleted successfully!" });
  } catch (error) {
    console.error("Delete feedback error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// =======================
// ADD / UPDATE REPLY
// =======================
export async function replyFeedback(req, res) {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Reply cannot be empty" });
    }

    const updated = await Feedback.findByIdAndUpdate(
      id,
      { reply },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Reply added successfully!",
      feedback: updated,
    });
  } catch (error) {
    console.error("Reply feedback error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

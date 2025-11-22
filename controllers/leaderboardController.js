import Leaderboard from "../models/Leaderboard.js";

// ✅ Get all leaderboard entries
export const getLeaderboard = async (req, res) => {
  try {
    const data = await Leaderboard.find().sort({ percentage: -1 });
    res.status(200).json({ success: true, leaderboard: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Add new leaderboard entry
export const addLeaderboardEntry = async (req, res) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json({ success: true, entry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Update leaderboard entry
export const updateLeaderboardEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Leaderboard.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Entry not found" });
    res.status(200).json({ success: true, updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Delete leaderboard entry
export const deleteLeaderboardEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Leaderboard.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Entry not found" });
    res.status(200).json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import { Profile } from "../models/profileModel.js";

// GET /api/profile/:username
export async function getProfileController(req, res) {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username });
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch profile", error: err });
  }
}

// POST /api/profile
export async function saveProfileController(req, res) {
  try {
    const data = req.body;
    const existing = await Profile.findOne({ username: data.username });
    let profile;

    if (existing) {
      // update existing profile
      existing.set(data);
      profile = await existing.save();
    } else {
      // create new profile
      profile = await Profile.create(data);
    }

    res.json({ success: true, message: "Profile saved successfully", data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to save profile", error: err });
  }
}

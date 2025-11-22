import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  id: String,
  label: String,
  url: String
});

const profileSchema = new mongoose.Schema({
  avatar: String,
  banner: String,
  displayName: String,
  username: { type: String, unique: true },
  bio: String,
  pronouns: String,
  links: [linkSchema],
  themeMode: String,
  accent: String,
  isPublic: Boolean,
  showBadgesPublic: Boolean,
  selectedBadges: [String]
}, { timestamps: true });

export const Profile = mongoose.model("Profile", profileSchema);

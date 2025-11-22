import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Announcement message is required"],
      trim: true,
    },
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;

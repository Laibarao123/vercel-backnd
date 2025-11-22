

import { Notification } from "../models/Notification.js";

// 🟢 Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 Create new notification
export const createNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;
    const newNotif = await Notification.create({ title, message, type });
    res.json({ success: true, notification: newNotif });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 Mark as read
export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json({ success: true, notification: notif });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 Delete notification
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
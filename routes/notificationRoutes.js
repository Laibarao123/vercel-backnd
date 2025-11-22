// // 📁 routes/notificationRoutes.js
// import express from "express";
// import {
//   getNotifications,
//   createNotification,
//   markAsRead,
//   deleteNotification,
// } from "../controllers/notificationController.js";

// const router = express.Router();

// router.get("/", getNotifications);
// router.post("/", createNotification);
// router.patch("/:id/read", markAsRead);
// router.delete("/:id", deleteNotification);

// export default router;
import express from "express";
import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications); // all
router.post("/", createNotification); // new
router.patch("/:id/read", markAsRead); // mark read
router.delete("/:id", deleteNotification); // delete

export default router;
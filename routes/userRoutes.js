


import express from "express";
import { 
  register, 
  login, 
  getAllUsers, 
  updateUser, 
  deleteUser ,
  getCurrentUser,

} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js"; // <-- Add this


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", getAllUsers);

router.get("/current", authMiddleware, getCurrentUser);
// ✅ New routes for edit & delete
router.put("/:id", updateUser); // edit user
router.delete("/:id", deleteUser); // delete user


export default router;
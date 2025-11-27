// src/routes/users.routes.js
import express from "express";
import {
  getMe,
  updateMe,
  upgradeToRecruiter
} from "../controllers/users.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All require auth
router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateMe);

// Upgrade role (Option B) - user asks to become a recruiter
router.post("/upgrade", authMiddleware, upgradeToRecruiter);

export default router;

// src/routes/companies.routes.js
import express from "express";
import {
  createCompany,
  listCompanies,
  getCompany,
  updateCompany,
  deleteCompany
} from "../controllers/companies.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleGuard } from "../middleware/roleGuard.js";

const router = express.Router();

// Public: list and get
router.get("/", listCompanies);
router.get("/:id", getCompany);

// Protected: recruiter-only create, update, delete
router.post("/", authMiddleware, roleGuard("recruiter"), createCompany);
router.patch("/:id", authMiddleware, roleGuard("recruiter"), updateCompany);
router.delete("/:id", authMiddleware, roleGuard("recruiter"), deleteCompany);

export default router;

// src/controllers/users.controller.js
import * as usersService from "../services/users.service.js";

export const getMe = async (req, res) => {
  try {
    const user = await usersService.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMe = async (req, res) => {
  try {
    const updated = await usersService.updateProfile(req.user.id, req.body);
    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Upgrade: candidate -> recruiter
export const upgradeToRecruiter = async (req, res) => {
  try {
    const upgraded = await usersService.upgradeToRecruiter(req.user.id);
    res.json({ message: "Upgraded to recruiter", user: upgraded });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

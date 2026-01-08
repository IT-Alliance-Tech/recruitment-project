const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserResume,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const uploadResume = require("../middleware/upload.middleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

// Resume upload
router.patch(
  "/resume",
  authMiddleware,
  uploadResume.single("resume"),
  updateUserResume
);

// ✅ CORRECT
module.exports = router;

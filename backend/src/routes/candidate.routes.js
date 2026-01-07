const express = require("express");
const router = express.Router();

const uploadResume = require("../middleware/upload.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const {
  getAllCandidates,
  createCandidate,
  updateCandidateStatus,
  deleteCandidate,
  getMyCandidateProfile,
  applyJob,
  scheduleInterview,
  updateInterviewRound, // ✅ ADD THIS
} = require("../controllers/candidate.controller");

/**
 * ===============================
 * USER ROUTES
 * ===============================
 */

// Get logged-in user's candidate profile
router.get("/me", authMiddleware, getMyCandidateProfile);

// Create / update candidate with resume upload
router.post(
  "/",
  authMiddleware,
  uploadResume.single("resume"),
  createCandidate
);

// Apply job
router.post("/apply-job/:jobId", authMiddleware, applyJob);

/**
 * ===============================
 * ADMIN ROUTES
 * ===============================
 */

// Get all candidates (Admin dashboard)
router.get("/", getAllCandidates);

// Update candidate status (manual)
router.patch("/:id/status", updateCandidateStatus);

// Schedule interview (HR / Tech / Managerial)
router.post("/:id/interview", scheduleInterview);

// ✅ UPDATE INTERVIEW ROUND RESULT (PASS / FAIL / HOLD)
router.patch("/:id/interview/:roundIndex", updateInterviewRound);

// Delete candidate
router.delete("/:id", deleteCandidate);

module.exports = router;

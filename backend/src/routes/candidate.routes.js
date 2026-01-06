const express = require("express");
const router = express.Router();

const uploadResume = require("../middleware/upload.middleware");

const {
  getAllCandidates,
  createCandidate,
  updateCandidateStatus,
  scheduleInterview,
  updateInterviewResult,
  deleteCandidate,
} = require("../controllers/candidate.controller");

// ✅ Get all candidates (Admin Pipeline)
router.get("/", getAllCandidates);

// ✅ Create candidate with resume upload (Public)
router.post(
  "/",
  uploadResume.single("resume"), // MUST be "resume"
  createCandidate
);

// ✅ Update candidate STATUS (Accept / Reject / Move flow)
router.patch("/:id/status", updateCandidateStatus);

// ✅ Schedule interview (Add interview round)
router.post("/:id/interview", scheduleInterview);

// ✅ Update interview round result (Pass / Fail)
router.patch("/:id/interview", updateInterviewResult);

// ✅ Delete candidate
router.delete("/:id", deleteCandidate);

module.exports = router;

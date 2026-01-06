const express = require("express");
const {
  applyJob,
  getMyApplications,
} = require("../controllers/application.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Apply for a job
router.post("/", authMiddleware, applyJob);

// Get logged-in user's applications
router.get("/", authMiddleware, getMyApplications);

module.exports = router;

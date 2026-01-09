const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
} = require("../controllers/job.controller");

const router = express.Router();

// Create job (admin use later)
router.post("/", createJob);

// Get all jobs
router.get("/", getAllJobs);

// Get job details
router.get("/:id", getJobById);

module.exports = router;

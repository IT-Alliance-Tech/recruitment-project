const Job = require("../models/Job");

/**
 * @desc Create a new job
 * @route POST /api/jobs
 */
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};

/**
 * @desc Get all jobs
 * @route GET /api/jobs
 */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

/**
 * @desc Get job by ID
 * @route GET /api/jobs/:id
 */
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job details",
    });
  }
};

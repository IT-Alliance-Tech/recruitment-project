const Application = require("../models/Application");
const Job = require("../models/Job");

/**
 * @desc Apply for a job
 * @route POST /api/applications
 * @access Protected
 */
exports.applyJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Prevent duplicate application
    const existingApplication = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      job: jobId,
      resumeUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to apply for job",
    });
  }
};

/**
 * @desc Get logged-in user's applied jobs
 * @route GET /api/applications
 * @access Protected
 */
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};
/**
 * @desc Update application status (Admin)
 * @route PATCH /api/applications/:id/status
 * @access Protected
 */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

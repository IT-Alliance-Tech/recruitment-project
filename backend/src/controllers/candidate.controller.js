const Candidate = require("../models/Candidate");
const Job = require("../models/Job");

/**
 * ===============================
 * USER CONTROLLERS
 * ===============================
 */

// GET logged-in user's candidate profile(s)
// Returns all candidates (applications) for the logged-in user
// This allows users to see ALL applied, rejected, shortlisted jobs
exports.getMyCandidateProfile = async (req, res) => {
  try {
    // ✅ CHANGE: Use find() instead of findOne() to get ALL candidates
    // This supports users with multiple applications
    const candidates = await Candidate.find({ user: req.user._id })
      // ✅ POPULATE: Include full job details (title, company, location, etc)
      .populate("job")
      // ✅ POPULATE: Include user details (name, email, phone)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    // ✅ CHANGE: Return empty array instead of 404
    // Frontend UI handles empty array gracefully
    res.status(200).json({
      success: true,
      candidates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidate profile",
    });
  }
};

// CREATE or UPDATE candidate profile
exports.createCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, position } = req.body;
    const resumeUrl = req.file ? req.file.path : null;

    let candidate = await Candidate.findOne({ user: req.user._id });

    // UPDATE EXISTING CANDIDATE
    if (candidate) {
      if (fullName) candidate.fullName = fullName;
      if (email) candidate.email = email;
      if (phone) candidate.phone = phone;
      if (position) candidate.position = position;
      if (resumeUrl) candidate.resumeUrl = resumeUrl;

      await candidate.save();

      return res.status(200).json({
        success: true,
        message: "Candidate updated",
        candidate,
      });
    }

    // CREATE NEW CANDIDATE
    candidate = await Candidate.create({
      user: req.user._id,
      fullName,
      email,
      phone,
      position,
      resumeUrl,
      status: "APPLIED",
    });

    res.status(201).json({
      success: true,
      message: "Candidate created",
      candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create/update candidate",
    });
  }
};

// APPLY JOB
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const candidate = await Candidate.findOne({ user: req.user._id });
    if (!candidate) {
      return res.status(400).json({
        success: false,
        message: "Complete profile before applying",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    candidate.job = jobId;
    candidate.status = "APPLIED";
    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Job applied successfully",
      candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to apply job",
    });
  }
};

/**
 * ===============================
 * ADMIN CONTROLLERS
 * ===============================
 */

// GET ALL candidates (Admin dashboard)
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        candidates,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidates",
    });
  }
};

// UPDATE candidate status (manual override)
exports.updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    candidate.status = status;
    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

// SCHEDULE INTERVIEW ROUND (HR / TECH / MANAGERIAL)
exports.scheduleInterview = async (req, res) => {
  try {
    const { roundName, scheduledAt, interviewer } = req.body;

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    candidate.interviewRounds.push({
      roundName,
      scheduledAt,
      interviewer,
    });

    candidate.status = "INTERVIEW_SCHEDULED";

    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Interview scheduled successfully",
      candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to schedule interview",
    });
  }
};

// UPDATE INTERVIEW ROUND RESULT (PASS / FAIL / HOLD)
exports.updateInterviewRound = async (req, res) => {
  try {
    const { roundStatus, feedback } = req.body;
    const { id, roundIndex } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    const round = candidate.interviewRounds[roundIndex];
    if (!round) {
      return res.status(404).json({
        success: false,
        message: "Interview round not found",
      });
    }

    // Update round details
    round.roundStatus = roundStatus;
    round.feedback = feedback;

    // 🔥 AUTOMATIC PIPELINE LOGIC
    if (roundStatus === "FAILED") {
      candidate.status = "REJECTED";
    } else if (roundStatus === "PASSED") {
      if (candidate.interviewRounds.length >= 3) {
        candidate.status = "SELECTED";
      } else {
        candidate.status = "IN_PROGRESS";
      }
    } else {
      candidate.status = "ON_HOLD";
    }

    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Interview round updated successfully",
      candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update interview round",
    });
  }
};

// DELETE candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    await candidate.deleteOne();

    res.status(200).json({
      success: true,
      message: "Candidate deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete candidate",
    });
  }
};

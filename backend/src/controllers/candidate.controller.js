const Candidate = require("../models/Candidate");
const Job = require("../models/Job");
const User = require("../models/User");
const { supabase } = require("../config/supabase");

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

// CREATE or UPDATE candidate profile (acts as global profile setup)
exports.createCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, position } = req.body;
    let resumeUrl = null;

    // UPLOAD TO SUPABASE IF FILE EXISTS
    if (req.file) {
      const fileName = `resumes/${req.user._id}-${Date.now()}-${
        req.file.originalname
      }`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload resume to storage",
        });
      }

      const { data } = supabase.storage.from("resumes").getPublicUrl(fileName);

      resumeUrl = data.publicUrl;
    }

    // ✅ SYNC WITH USER MODEL (Source of truth for profile)
    const user = await User.findById(req.user._id);
    if (user) {
      if (fullName) user.name = fullName;
      if (phone) user.phone = phone;
      if (resumeUrl) user.resumeUrl = resumeUrl;
      await user.save();
    }

    // Update LATEST candidate record or create new one
    let candidate = await Candidate.findOne({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (candidate) {
      if (fullName) candidate.fullName = fullName;
      if (email) candidate.email = email;
      if (phone) candidate.phone = phone;
      if (position) candidate.position = position;
      if (resumeUrl) candidate.resumeUrl = resumeUrl;

      await candidate.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        candidate,
      });
    }

    // CREATE NEW CANDIDATE (Initial profile setup)
    if (!resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "Resume is required for initial profile setup",
      });
    }

    candidate = await Candidate.create({
      user: req.user._id,
      fullName: fullName || user?.name,
      email: email || user?.email,
      phone: phone || user?.phone,
      position,
      resumeUrl,
      status: "APPLIED",
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      candidate,
    });
  } catch (error) {
    console.error("Candidate creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create/update candidate",
      error: error.message,
    });
  }
};

// APPLY JOB
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // 1. CHECK FOR DUPLICATE APPLICATION
    const existingApp = await Candidate.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existingApp) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // 2. GET USER PROFILE DATA (Source of Truth)
    const user = await User.findById(req.user._id);

    // Fallback to latest candidate record if user model is missing data
    const latestCandidate = await Candidate.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    const fullName = user?.name || latestCandidate?.fullName;
    const email = user?.email || latestCandidate?.email;
    const phone = user?.phone || latestCandidate?.phone;
    const resumeUrl = user?.resumeUrl || latestCandidate?.resumeUrl;

    if (!resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "Upload your resume before applying",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // 3. CREATE NEW APPLICATION RECORD
    const newApplication = await Candidate.create({
      user: req.user._id,
      job: jobId,
      fullName,
      email,
      phone,
      position: latestCandidate?.position || "Manual Application",
      resumeUrl,
      status: "APPLIED",
    });

    res.status(201).json({
      success: true,
      message: "Job applied successfully",
      candidate: newApplication,
    });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply job",
      error: error.message,
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

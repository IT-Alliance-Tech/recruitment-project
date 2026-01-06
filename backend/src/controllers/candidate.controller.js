const Candidate = require("../models/Candidate");
const { supabase } = require("../config/supabase");

/**
 * @desc    Get all candidates (Admin Pipeline) WITH pagination
 * @route   GET /api/candidates
 */
const getAllCandidates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalCandidates = await Candidate.countDocuments();

    const candidates = await Candidate.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: {
        candidates,
        pagination: {
          totalCandidates,
          totalPages: Math.ceil(totalCandidates / limit),
          currentPage: page,
        },
      },
    });
  } catch (error) {
    console.error("FAILED_TO_FETCH_CANDIDATES", error);

    return res.status(500).json({
      success: false,
      error: "FAILED_TO_FETCH_CANDIDATES",
    });
  }
};

/**
 * @desc    Create candidate (Resume Upload)
 * @route   POST /api/candidates
 */
const createCandidate = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      position,
      skills,
      experience,
    } = req.body;

    // ✅ Validate resume
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "RESUME_REQUIRED",
        message: "Resume file is required",
      });
    }

    // ✅ Validate Supabase config
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.status(500).json({
        success: false,
        error: "SUPABASE_NOT_CONFIGURED",
        message: "Supabase environment variables are missing",
      });
    }

    const file = req.file;
    const fileName = `resume-upload/${Date.now()}-${file.originalname}`;

    // ✅ Upload resume to Supabase
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      return res.status(500).json({
        success: false,
        error: "FAILED_TO_UPLOAD_RESUME",
        message: uploadError.message,
      });
    }

    // ✅ Get public resume URL
    const { data: publicUrlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(fileName);

    const resumeUrl = publicUrlData.publicUrl;

    // ✅ Save candidate in MongoDB (status always APPLIED)
    const candidate = await Candidate.create({
      fullName,
      email,
      phone,
      position,
      skills: skills ? skills.split(",") : [],
      experience: experience || 0,
      resumeUrl,
      status: "APPLIED",
    });

    return res.status(201).json({
      success: true,
      message: "Candidate applied successfully",
      data: candidate,
    });
  } catch (error) {
    console.error("Create candidate error:", error);

    return res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

/**
 * @desc    Update candidate status (Accept / Reject / Move flow)
 * @route   PATCH /api/candidates/:id/status
 */
const updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: "CANDIDATE_NOT_FOUND",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Candidate status updated",
      data: candidate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "FAILED_TO_UPDATE_STATUS",
    });
  }
};

/**
 * @desc    Schedule interview (Add interview round)
 * @route   POST /api/candidates/:id/interview
 */
const scheduleInterview = async (req, res) => {
  try {
    const { roundName, scheduledAt, interviewer } = req.body;

    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: "CANDIDATE_NOT_FOUND",
      });
    }

    candidate.interviewRounds.push({
      roundName,
      scheduledAt,
      interviewer,
    });

    candidate.status = "INTERVIEW_SCHEDULED";
    await candidate.save();

    return res.status(200).json({
      success: true,
      message: "Interview scheduled successfully",
      data: candidate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "FAILED_TO_SCHEDULE_INTERVIEW",
    });
  }
};

/**
 * @desc    Update interview round result
 * @route   PATCH /api/candidates/:id/interview
 */
const updateInterviewResult = async (req, res) => {
  try {
    const { roundIndex, roundStatus, feedback } = req.body;

    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: "CANDIDATE_NOT_FOUND",
      });
    }

    const round = candidate.interviewRounds[roundIndex];

    if (!round) {
      return res.status(400).json({
        success: false,
        error: "ROUND_NOT_FOUND",
      });
    }

    round.roundStatus = roundStatus;
    round.feedback = feedback;

    // ❌ If failed
    if (roundStatus === "FAILED") {
      candidate.status = "REJECTED";
    }

    // ✅ If passed
    if (roundStatus === "PASSED") {
      const allRoundsPassed = candidate.interviewRounds.every(
        (r) => r.roundStatus === "PASSED"
      );

      candidate.status = allRoundsPassed ? "SELECTED" : "IN_PROGRESS";
    }

    await candidate.save();

    return res.status(200).json({
      success: true,
      message: "Interview round updated",
      data: candidate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "FAILED_TO_UPDATE_INTERVIEW",
    });
  }
};

/**
 * @desc    Delete candidate
 * @route   DELETE /api/candidates/:id
 */
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: "CANDIDATE_NOT_FOUND",
      });
    }

    await candidate.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "FAILED_TO_DELETE_CANDIDATE",
    });
  }
};

module.exports = {
  getAllCandidates,
  createCandidate,
  updateCandidateStatus,
  scheduleInterview,
  updateInterviewResult,
  deleteCandidate,
};

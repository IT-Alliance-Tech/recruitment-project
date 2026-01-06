const mongoose = require("mongoose");

/**
 * Interview Round Schema
 * Handles multiple interview rounds (HR, Technical, Managerial, etc.)
 */
const interviewRoundSchema = new mongoose.Schema({
  roundName: {
    type: String, // HR, Technical, Managerial
    required: true,
  },

  scheduledAt: {
    type: Date,
    required: true,
  },

  interviewer: {
    type: String,
  },

  roundStatus: {
    type: String,
    enum: ["PENDING", "PASSED", "FAILED"],
    default: "PENDING",
  },

  feedback: {
    type: String,
  },
});

/**
 * Candidate Schema
 */
const candidateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
    },

    position: {
      type: String,
      required: true,
    },

    // ✅ Supabase public resume URL
    resumeUrl: {
      type: String,
      required: true,
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: Number,
      default: 0,
    },

    /**
     * MAIN ATS STATUS
     * Controls the full recruitment flow
     */
    status: {
      type: String,
      enum: [
        "APPLIED",               // Resume uploaded
        "SHORTLISTED",           // Resume accepted
        "INTERVIEW_SCHEDULED",   // Interview scheduled
        "IN_PROGRESS",           // Interview ongoing
        "SELECTED",              // Final selection
        "REJECTED",              // Rejected at any stage
      ],
      default: "APPLIED",
    },

    /**
     * Interview Rounds (Multiple)
     */
    interviewRounds: {
      type: [interviewRoundSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);

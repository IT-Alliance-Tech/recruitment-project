require("dotenv").config(); // ✅ MUST BE FIRST

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const clientRoutes = require("./routes/client.routes");
const candidateRoutes = require("./routes/candidate.routes");
const contactRoutes = require("./routes/contact.routes");
const authRoutes = require("./routes/auth.routes"); // ✅ Existing
const jobRoutes = require("./routes/job.routes"); // ✅ Existing (STEP 5)
const applicationRoutes = require("./routes/application.routes"); // ✅ ADDED (STEP 6)

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Recruitment Backend is running 🚀");
});

// API Routes
app.use("/api/clients", clientRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes); // ✅ Existing
app.use("/api/jobs", jobRoutes); // ✅ Existing
app.use("/api/applications", applicationRoutes); // ✅ ADDED (STEP 6)

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Multer error handler
app.use((err, req, res, next) => {
  if (err instanceof require("multer").MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        error: "FILE_TOO_LARGE",
        message: "Resume must be less than 10MB",
      });
    }
  }
  next(err);
});

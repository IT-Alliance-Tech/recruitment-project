require("dotenv").config(); // MUST BE FIRST

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const clientRoutes = require("./routes/client.routes");
const candidateRoutes = require("./routes/candidate.routes");
const contactRoutes = require("./routes/contact.routes");
const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔍 DEBUG VALIDATION (VERY IMPORTANT)
const routes = {
  clientRoutes,
  candidateRoutes,
  contactRoutes,
  authRoutes,
  jobRoutes,
  applicationRoutes,
};

Object.entries(routes).forEach(([name, route]) => {
  if (typeof route !== "function") {
    console.error(`❌ ${name} is NOT a router. Type:`, typeof route);
    console.error(route);
    process.exit(1); // STOP SERVER IMMEDIATELY
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Recruitment Backend is running 🚀");
});

// API Routes
app.use("/api/clients", clientRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Multer error handler
app.use((err, req, res, next) => {
  if (err && err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Resume must be less than 10MB",
      });
    }
  }
  next(err);
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

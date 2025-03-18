const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Enrollment Schema
const EnrollmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  date: String,
});

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

// POST: Create a new enrollment
app.post("/api/enrollments", async (req, res) => {
  try {
    const newEnrollment = new Enrollment(req.body);
    await newEnrollment.save();
    res.status(201).json({ message: "Enrollment successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to enroll student" });
  }
});

// GET: Fetch all enrollments
app.get("/api/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const Enrollment = require("../models/Enrollment");

// Function to calculate end date based on course duration
const calculateEndDate = (course) => {
  const startDate = new Date();
  let durationMonths = 6; // Default duration (Java, Python)

  if (course === "React") durationMonths = 3;
  if (course === "AWS" || course === "SQL") durationMonths = 4;

  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + durationMonths);
  
  return { startDate, endDate };
};

exports.enrollStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Calculate startDate and endDate
    const { startDate, endDate } = calculateEndDate(course);

    const newEnrollment = new Enrollment({ name, email, course, startDate, endDate });
    await newEnrollment.save();

    res.status(201).json({ message: "Student enrolled successfully!", newEnrollment });
  } catch (error) {
    res.status(500).json({ error: "Failed to enroll student", details: error.message });
  }
};

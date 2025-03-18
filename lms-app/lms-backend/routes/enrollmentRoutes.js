router.get("/api/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find(); 
    res.json(enrollments); // Ensure dates are sent
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

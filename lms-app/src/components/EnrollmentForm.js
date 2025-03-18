import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "../styles/enrollmentForm.css"; // Custom styles

const EnrollmentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Java");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEnrollment = { name, email, course, date: new Date().toISOString() };

    try {
      const response = await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEnrollment),
      });

      if (!response.ok) {
        throw new Error("Failed to enroll student");
      }

      setMessage("✅ Student enrolled successfully!");
      setName("");
      setEmail("");
      setCourse("Java");

      setTimeout(() => {
        navigate("/enrollments");
      }, 1000);
    } catch (error) {
      setMessage("❌ Error enrolling student. Try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-3">📌 Student Enrollment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select className="form-select" value={course} onChange={(e) => setCourse(e.target.value)} required>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="AWS">AWS</option>
              <option value="React">React</option>
              <option value="SQL">SQL</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">Enroll Student</button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default EnrollmentForm;

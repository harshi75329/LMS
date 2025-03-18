import { useEffect, useState } from "react";
import "../styles/enrollmentList.css";

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/enrollments")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch enrollments");
        return response.json();
      })
      .then((data) => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="enrollment-container">
      <h2>📚 Enrollment List</h2>
      {loading ? <p>Loading...</p> : error ? <p className="error-message">{error}</p> : (
        <table className="enrollment-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment, index) => (
              <tr key={enrollment._id}>
                <td>{index + 1}</td>
                <td>{enrollment.name}</td>
                <td>{enrollment.email}</td>
                <td>{enrollment.course}</td>
                <td>{new Date(enrollment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnrollmentList;

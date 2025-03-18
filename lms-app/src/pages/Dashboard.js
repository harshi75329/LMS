import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userId = '123'; // Change this dynamically for logged-in user

  useEffect(() => {
    axios.get(`/enrolled-courses/${userId}`)
      .then(response => setEnrolledCourses(response.data))
      .catch(error => console.error('Error fetching enrolled courses:', error));
  }, []);

  return (
    <div>
      <h2>My Courses</h2>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

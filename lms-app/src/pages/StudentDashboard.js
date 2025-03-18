import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.module.css';

const StudentDashboard = () => {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/courses">View Courses</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentDashboard;

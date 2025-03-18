import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TeacherDashboard.module.css'; // Import CSS

const TeacherDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h2 className={styles.heading}>📚 Teacher Dashboard ✨</h2>
      <p className={styles.subheading}>Empower students with knowledge! 💡</p>

      <nav>
        <ul>
          <li><Link to="/courses">📖 View Courses</Link></li>
          <li><Link to="/create-course">📝 Create Course</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default TeacherDashboard;

import React , { useEffect, useState } from 'react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import './DashboardPage.module.css';

const DashboardPage = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setRole(decoded.role);
    }
  }, []);

  if (role === null) return <p>Loading...</p>;

  return role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
};


export default DashboardPage;

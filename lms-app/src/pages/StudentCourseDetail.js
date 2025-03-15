import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CourseDetail.module.css';

function StudentCourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
 
  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        console.log("Course data:", response.data);
        setCourse(response.data);
      })
      .catch(error => console.error('Error fetching course:', error));
  
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://localhost:5000/api/courses/${id}/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log("Progress API Response:", response.data); // Debug log
        if (response.data && typeof response.data.progress === 'number') {
         // setProgress(response.data.progress);
        } else {
          console.error("Invalid progress response format:", response.data);
        }
      })
      .catch(error => console.error('Error fetching progress:', error));
  
      axios.get(`http://localhost:5000/api/courses/${id}/completed`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log("Completion API Response:", response.data); // Debug log
        if (response.data && typeof response.data.completed === 'boolean') {
          //setIsCompleted(response.data.completed);
        } else {
          console.error("Invalid completion response format:", response.data);
        }
      })
      .catch(error => console.error('Error checking course completion:', error));
    }
  }, [id]);
  
  if (!course) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{course.title}</h2>
      <p className={styles.description}>{course.description}</p>

      {/* Progress Tracking */}
     

      {/* Lessons */}
      <h3>Lessons</h3>
      <ul className={styles.lessonList}>
        {course.lessons.map((lesson, index) => (
          <li key={index} className={styles.lessonItem}>
            <strong>{lesson.title}:</strong> {lesson.content}
          </li>
        ))}
      </ul>

      {/* Quiz Section */}
      <div className={styles.quizSection}>
        <h3>Quiz</h3>
        <Link to={`/courses/${id}/quiz`}>
          <button className={styles.button}>Take Quiz</button>
        </Link>
      </div>

      <button className={styles.backButton} onClick={() => navigate('/courses')}>Back</button>
    </div>
  );
}

export default StudentCourseDetail;
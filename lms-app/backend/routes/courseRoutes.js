const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers can create courses' });
        const newCourse = new Course({ title, description, teacher: req.user.id });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'name');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:id/enroll', authMiddleware, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (req.user.role !== 'student') return res.status(403).json({ message: 'Only students can enroll in courses' });
        if (course.students.includes(req.user.id)) return res.status(400).json({ message: 'Already enrolled' });
        course.students.push(req.user.id);
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id/students', authMiddleware, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('students', 'name');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (req.user.role !== 'teacher' || course.teacher.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        res.json(course.students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id/teachers', authMiddleware, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'name');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course.teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id/teacher', authMiddleware, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        const teacher = await User.findById(course.teacher);
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add quiz to a course (Only teachers)
router.post('/:id/add-quiz', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers can add quizzes' });
        const { question, options, answer } = req.body;
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        course.quizzes.push({ question, options, answer });
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get quiz for a course
router.get('/:id/quiz', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course.quizzes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit quiz answers
router.post('/:id/submit-quiz', authMiddleware, async (req, res) => {
    try {
        const { answers } = req.body;
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        let score = 0;
        course.quizzes.forEach(q => {
            if (answers[q._id] === q.answer) {
                score++;
            }
        });
        res.json({ score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id/progress', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const totalLessons = course.lessons.length;
        const completedLessons = user.completedLessons.filter(l => l.courseId.equals(course._id)).length;
        
        const quizAttempt = user.completedQuizzes.find(q => q.courseId.equals(course._id));
        const quizScore = quizAttempt ? quizAttempt.score : 0;

        const lessonProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 70 : 0;
        const quizProgress = quizScore > 0 ? 30 : 0;

        const totalProgress = Math.round(lessonProgress + quizProgress);

        res.json({ progress: totalProgress });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id/completed', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const totalLessons = course.lessons.length;
        const completedLessons = user.completedLessons.filter(l => l.courseId.equals(course._id)).length;
        const quizAttempt = user.completedQuizzes.find(q => q.courseId.equals(course._id));
        const quizScore = quizAttempt ? quizAttempt.score : 0;

        const isCompleted = completedLessons === totalLessons && quizScore >= 70;

        res.json({ completed: isCompleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        console.log('Logged-in user:', req.user.id);
        console.log('Course teacher:', course.teacher.toString());

        if (req.user.role !== 'teacher' || course.teacher.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: Only the course teacher can delete this course' });
        }

        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;


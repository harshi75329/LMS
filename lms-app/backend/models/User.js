const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    completedLessons: [{ courseId: mongoose.Schema.Types.ObjectId, lessonId: mongoose.Schema.Types.ObjectId }],
    completedQuizzes: [{ courseId: mongoose.Schema.Types.ObjectId, score: Number }]
});

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['student', 'teacher'], required: true },
});

module.exports = mongoose.model('User', userSchema);

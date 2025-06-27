const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
  date: String,
});

module.exports = mongoose.model('Lecture', lectureSchema);

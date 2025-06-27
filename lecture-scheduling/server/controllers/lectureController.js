const Lecture = require('../models/lecture');
const Instructor = require('../models/instructor');
const Course = require('../models/course');

const addLecture = async (req, res) => {
  try {
    const { courseId, instructorId, date } = req.body;

    // Check if instructor has a lecture on the same date
    const conflict = await Lecture.findOne({ instructor: instructorId, date });
    if (conflict) {
      return res.status(400).json({ message: 'Instructor is already booked on this date' });
    }

    const lecture = new Lecture({ course: courseId, instructor: instructorId, date });
    await lecture.save();

    // Add lecture to the course
    await Course.findByIdAndUpdate(courseId, {
      $push: { lectures: lecture._id }
    });

    res.status(201).json(lecture);
  } catch (error) {
    console.error('Error adding lecture:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getLecturesForInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const lectures = await Lecture.find({ instructor: instructorId })
      .populate('course', 'name')
      .sort('date');
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lectures' });
  }
};

module.exports = { addLecture, getLecturesForInstructor };

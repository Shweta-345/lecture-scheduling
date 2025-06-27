const Course = require('../models/course');

const addCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    if (!name || !level || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const course = new Course({ name, level, description, image });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('lectures');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

module.exports = { addCourse, getCourses };

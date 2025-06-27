const Instructor = require('../models/instructor');

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInstructor = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const instructor = new Instructor({ name, email });
    await instructor.save();

    res.status(201).json({ message: 'Instructor created', instructor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

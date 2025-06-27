const express = require('express');
const router = express.Router();
const {
  addLecture,
  getLecturesForInstructor
} = require('../controllers/lectureController');

router.post('/', addLecture);
router.get('/:instructorId', getLecturesForInstructor);

module.exports = router;

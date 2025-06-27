const express = require('express');
const router = express.Router();
const {
  getInstructors,
  createInstructor
} = require('../controllers/instructorController');

router.get('/', getInstructors);      
router.post('/', createInstructor);    

module.exports = router;

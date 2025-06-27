const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


// Routes
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use('/api/courses', courseRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/lectures', lectureRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.error('DB Connection Error:', err));

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './CourseList.css';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching courses...");
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses'); 
        console.log("Fetched courses:", res.data);
        setCourses(res.data);
      } catch (err) {
        console.error("Course fetch error:", err);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Header />
     <div className="course-list container mx-auto p-6 max-w-4xl">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Courses</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700">{course.name}</h3>
              <p className="text-gray-600">Level: {course.level}</p>
              <p className="text-gray-600">Description: {course.description}</p>
              {course.image && (
                <img src={course.image} alt={course.name} className="mt-2 rounded" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseList;

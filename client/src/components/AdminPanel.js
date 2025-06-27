import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import Header from './Header';

function AdminPanel() {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ name: '', level: '', description: '', image: '' });
  const [lectureForm, setLectureForm] = useState({ courseId: '', instructorId: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [instructorsRes, coursesRes] = await Promise.all([
          axios.get(`${API_BASE}/instructors`),
          axios.get(`${API_BASE}/courses`)
        ]);
        setInstructors(instructorsRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateCourseForm = () => {
    if (!form.name || !form.level || !form.description) {
      setError('Please fill in all required course fields');
      return false;
    }
    return true;
  };

  const validateLectureForm = () => {
    if (!lectureForm.courseId || !lectureForm.instructorId || !lectureForm.date) {
      setError('Please fill in all lecture fields');
      return false;
    }
    return true;
  };

  const addCourse = async () => {
    if (!validateCourseForm()) return;

    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE}/courses`, form);
      setSuccess('Course added successfully');
      setForm({ name: '', level: '', description: '', image: '' });

      const updatedCourses = await axios.get(`${API_BASE}/courses`);
      setCourses(updatedCourses.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  const assignLecture = async () => {
    if (!validateLectureForm()) return;

    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE}/lectures`, lectureForm);
      setSuccess('Lecture assigned successfully');
      setLectureForm({ courseId: '', instructorId: '', date: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to assign lecture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-panel container mx-auto p-6 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Panel</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Add Course */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl animate-fadeInUp">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Course</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Course Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="input-field" placeholder="Level *" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} />
            <input className="input-field" placeholder="Description *" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input className="input-field" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          </div>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-200"
            onClick={addCourse}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Course'}
          </button>
        </div>

        {/* Assign Lecture */}
        <div className="bg-white shadow-md rounded-xl p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl animate-fadeInUp">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Assign Lecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="input-field" value={lectureForm.courseId} onChange={e => setLectureForm({ ...lectureForm, courseId: e.target.value })}>
              <option value="">Select Course *</option>
              {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <select className="input-field" value={lectureForm.instructorId} onChange={e => setLectureForm({ ...lectureForm, instructorId: e.target.value })}>
              <option value="">Select Instructor *</option>
              {instructors.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
            </select>
            <input className="input-field" type="date" value={lectureForm.date} onChange={e => setLectureForm({ ...lectureForm, date: e.target.value })} />
          </div>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-200"
            onClick={assignLecture}
            disabled={loading}
          >
            {loading ? 'Assigning...' : 'Assign Lecture'}
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;

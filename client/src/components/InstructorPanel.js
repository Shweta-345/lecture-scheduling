import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InstructorPanel.css';
import Header from './Header';

function InstructorPanel() {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instructorName, setInstructorName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lecturesRes, instructorsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/lectures/${id}`),
          axios.get(`http://localhost:5000/api/instructors`)
        ]);

        setLectures(lecturesRes.data);

        const instructor = instructorsRes.data.find(i => i._id === id);
        setInstructorName(instructor?.name || 'Instructor');
      } catch (err) {
        console.error("InstructorPanel fetch error:", err);
        setError('Failed to fetch instructor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="instructor-panel container mx-auto p-6 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {instructorName}'s Lectures
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        ) : lectures.length === 0 ? (
          <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded text-center">
            No lectures assigned yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lec) => (
              <div
                key={lec._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold text-gray-700 mb-2">{lec.course?.name || 'Unnamed Course'}</h4>
                <p className="text-gray-600">
                  Date: {lec.date ? new Date(lec.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'No date'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorPanel;

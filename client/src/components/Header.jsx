import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/instructors');
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid instructors data format: Expected an array');
        }
        setInstructors(response.data);
      } catch (err) {
        console.error('Header fetch error:', err);
        setError(`Failed to fetch instructors: ${err.response?.status || 'Unknown'} - ${err.message}`);
      }
    };
    fetchInstructors();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <span className="logo-text">Ideamagix</span>
        </Link>

        <nav className="flex space-x-4 items-center">
          <Link
            to="/admin"
            className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Admin Panel
          </Link>
          <Link
            to="/courses"
            className="text-white px-4 py-2 hover:text-gray-200"
          >
            Courses
          </Link>

          <select
            className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
            onChange={(e) => e.target.value && navigate(`/instructor/${e.target.value}`)}
          >
            <option value="">Instructor Panel</option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition"
          >
            Logout
          </button>
        </nav>

        {error && (
          <div className="text-red-300 text-sm">{error}</div>
        )}
      </div>
    </header>
  );
}

export default Header;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this includes your background image styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        role: 'admin'  // Fixed to admin
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);

      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-background min-h-screen flex flex-col justify-center items-center">
      <div className="bg-black bg-opacity-60 text-white text-4xl font-bold px-8 py-4 rounded mb-10 shadow-lg">
        Welcome to Ideamagix
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <input
          type="email"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

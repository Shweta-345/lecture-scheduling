import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import InstructorPanel from './components/InstructorPanel';
import CourseList from './components/CourseList'; 
import Header from './components/Header';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
         <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/instructor/:id" element={<InstructorPanel />} />
      <Route path="/courses" element={<CourseList />} /> 
      <Route path="/" element={
        <div>
          <Header />
          <div className="container mx-auto p-6">
            Welcome to Ideamagix Learning Platform
          </div>
        </div>
      } />
    </Routes>
  </BrowserRouter>
);

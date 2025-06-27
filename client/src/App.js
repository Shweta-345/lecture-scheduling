import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import InstructorPanel from './components/InstructorPanel';
import CourseList from './components/CourseList'; 
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/instructor/:id" element={<InstructorPanel />} />
        <Route path="/courses" element={<CourseList />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

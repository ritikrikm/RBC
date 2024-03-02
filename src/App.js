import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Base from '../src/components/Base';
import Login from '../src/components/Login';
import Dashboard from '../src/components/Dashboard';
import About from './components/About';

function App() {
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Base>
    </Router>
  );
}

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login_Page from './components/Login_Page';
import Signup from './components/Signup';
import ProfileForm from './components/ProfileForm';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login_Page />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;

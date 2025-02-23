// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login_Page from './components/Login_Page';
import Signup from './components/Signup';
import ProfileForm from './components/ProfileForm';
import Welcome from './components/Welcome';
import ChatBot from './components/ChatBot';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login_Page />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

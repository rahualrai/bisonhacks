// src/components/Welcome.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';

const Welcome = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Welcome</h1>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Hello, <strong>{userName}</strong>!
        </p>
        <button onClick={handleLogout} className="auth-button">Logout</button>
      </div>
    </div>
  );
};

export default Welcome;

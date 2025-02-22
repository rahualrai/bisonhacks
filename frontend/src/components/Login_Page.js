// src/components/Login_Page.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { FaGoogle } from 'react-icons/fa';
import '../Auth.css';

const Login_Page = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to profile form to collect extra details
      navigate('/profile');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/profile');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">YourLogo</div>
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-subtitle">Use your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="input-label">
            Email
            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="input-label">
            Password
            <input
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="links-row">
            <a href="#forgot-email" className="small-link">Forgot email?</a>
            <a href="#forgot-password" className="small-link">Forgot password?</a>
          </div>

          <button type="submit" className="auth-button">Next</button>
        </form>

        <button onClick={handleGoogleSignIn} className="auth-button google-button">
          <FaGoogle style={{ marginRight: '8px', fontSize: '18px' }} />
          Sign in with Google
        </button>

        <div style={{ marginTop: '20px', fontSize: '14px', color: '#5f6368' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#1a73e8', textDecoration: 'none' }}>
            Create account
          </Link>
        </div>
      </div>

      <footer className="auth-footer">
        <div className="footer-left">English (United States)</div>
        <div className="footer-right">
          <a href="#help">Help</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default Login_Page;

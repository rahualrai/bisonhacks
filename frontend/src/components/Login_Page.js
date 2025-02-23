// src/components/Login_Page.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FaGoogle } from 'react-icons/fa';
import '../Auth.css';

const Login_Page = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkProfileExistsAndNavigate = async () => {
    const user = auth.currentUser;
    const profileDoc = await getDoc(doc(db, 'userProfiles', user.uid));
    if (profileDoc.exists()) {
      navigate('/welcome');
    } else {
      navigate('/profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await checkProfileExistsAndNavigate();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      await checkProfileExistsAndNavigate();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">iScholar</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue your journey</p>

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
            <a href="#forgot-email" className="small-link">
              Forgot email?
            </a>
            <a href="#forgot-password" className="small-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <button onClick={handleGoogleSignIn} className="auth-button google-button">
          <FaGoogle />
          Sign in with Google
        </button>

        <div className="create-account">
          Don't have an account?{' '}
          <Link to="/signup">
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

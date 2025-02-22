// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
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
        <div className="brand">YourLogo</div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Use your email to sign up</p>

        <form onSubmit={handleSignup} className="auth-form">
          <label className="input-label">
            Name
            <input
              type="text"
              className="auth-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

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

          <button type="submit" className="auth-button">Next</button>
        </form>

        <button onClick={handleGoogleSignIn} className="auth-button google-button">
          Sign up with Google
        </button>

        <div style={{ marginTop: '20px', fontSize: '14px', color: '#5f6368' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1a73e8', textDecoration: 'none' }}>
            Sign in
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

export default Signup;

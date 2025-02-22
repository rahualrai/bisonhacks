// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './Auth.css';         // Global Auth styles
import './ProfileForm.css';  // Profile form styles

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

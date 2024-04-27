import React from 'react';
import { createRoot } from 'react-dom';
import App from './App.jsx';
import './css/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isMobile = window.innerWidth < 768; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position={isMobile ? "bottom-center" : "top-right"} />
  </React.StrictMode>
);

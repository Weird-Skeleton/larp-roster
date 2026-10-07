import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ReactGA from 'react-ga4'; // Add this import

// Add your specific Measurement ID here
ReactGA.initialize("G-ZSWMHSK2XD");
ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Character Editor Load" });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
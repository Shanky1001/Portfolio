import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Register the service worker
if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

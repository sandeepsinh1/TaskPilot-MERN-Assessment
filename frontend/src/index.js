// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure the path is correct
import './style.css'; // Or './style.css' if you chose that name

// Get the root element from public/index.html
const rootElement = document.getElementById('root');

// Create the root and render the App component
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
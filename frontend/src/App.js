import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

// Context Imports
// Ensure AuthContext provides the 'loading' property
import { AuthProvider, AuthContext } from './context/AuthContext'; 
import { TaskProvider } from './context/TaskContext';

// --- Private Route Component for Authorization ---
function PrivateRoute({ children, role }) {
  // ⭐️ MODIFIED: Pull the 'loading' state from the context
  const { user, loading } = useContext(AuthContext); 
  
  // ⭐️ FIX: Wait for context initialization (stops the render crash)
  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>**Loading...**</div>;
  }

  // If not authenticated, redirect to the login page (root path)
  if (!user) return <Navigate to="/" replace />; 
  
  // Redirect if role doesn't match the route's required role
  if (role && user.role !== role) {
    // Navigate to their correct dashboard based on their role
    const destination = user.role === 'admin' ? '/admin' : '/employee';
    return <Navigate to={destination} replace />;
  }

  return children;
}

function App() {
  return (
    // AuthProvider must be the outermost provider
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            {/* Public Route: Login */}
            <Route path="/" element={<Login />} />
            
            {/* Admin Protected Route */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            
            {/* Employee Protected Route */}
            <Route 
              path="/employee" 
              element={
                <PrivateRoute role="employee">
                  <EmployeeDashboard />
                </PrivateRoute>
              } 
            />

            {/* Catch-all route for 404s */}
            {/* Only redirect to '/' if the user is not authenticated, otherwise they should be on a dashboard */}
            {/* Given your setup, keeping the redirect to '/' is fine for unauthorized access */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
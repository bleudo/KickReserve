import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminLogin from '../components/admin/AdminLogin';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  </Router>
);

export default AppRoutes;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <Navigate to="/auth" />; // Redirect to login page n9edro nkhedmouha bhad tari9a
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />; // Redirect to dashboard page 
  }

  if (user.role === 'admin' && !adminOnly) {
    return <Navigate to="/admin" />; // Redirect to admin page
  }

  return children;
};

export default PrivateRoute;

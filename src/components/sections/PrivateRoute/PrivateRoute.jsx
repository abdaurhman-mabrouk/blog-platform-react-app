/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // if 'User' is not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // if 'User' is logged in → render the children components
  return children;
}

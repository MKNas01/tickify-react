import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem('ticketapp_session');

  if (!session) {
    toast.error("Your session has expired — please log in again.", { duration: 3000 });
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
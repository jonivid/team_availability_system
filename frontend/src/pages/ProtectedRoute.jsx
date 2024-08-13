import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    // If there is no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the children components
  return children;
};

export default ProtectedRoute;

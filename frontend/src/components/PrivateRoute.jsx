import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap'; // Importing spinner
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Get loading state from context

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
        <p className="ms-3">Checking authentication...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

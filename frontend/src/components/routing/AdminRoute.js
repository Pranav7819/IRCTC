import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute; 
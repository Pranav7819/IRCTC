import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../store/slices/authSlice';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, token, isAuthenticated]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 
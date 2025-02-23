import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';
import {
  DirectionsTransit as TrainIcon,
  Book as BookingIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import DashboardStatistics from './DashboardStatistics';
import BookingAnalytics from './BookingAnalytics';
import ManageTrains from './ManageTrains';
import ManageBookings from './ManageBookings';
import { getDashboardStatistics } from '../../store/slices/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDashboardStatistics());
  }, [dispatch]);

  const menuItems = [
    {
      title: 'Dashboard Overview',
      icon: DashboardIcon,
      path: '/admin',
      color: '#1976d2'
    },
    {
      title: 'Manage Trains',
      icon: TrainIcon,
      path: '/admin/manage-trains',
      color: '#2e7d32'
    },
    {
      title: 'Manage Bookings',
      icon: BookingIcon,
      path: '/admin/manage-bookings',
      color: '#ed6c02'
    }
  ];

  const DashboardHome = () => (
    <Box>
      <DashboardStatistics />
      <BookingAnalytics />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => navigate(item.path)}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: `${item.color}20`,
                    mb: 1
                  }}
                >
                  <item.icon sx={{ fontSize: 40, color: item.color }} />
                </Box>
                <Typography variant="h6" align="center">
                  {item.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/manage-trains" element={<ManageTrains />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />
      </Routes>
    </Box>
  );
};

export default AdminDashboard; 
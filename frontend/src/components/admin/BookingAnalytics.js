import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Grid } from '@mui/material';
import {
  DirectionsTransit as TrainIcon,
  Cancel as CancelIcon,
  MonetizationOn as RevenueIcon,
  Book as BookingIcon
} from '@mui/icons-material';

const BookingAnalytics = () => {
  const { statistics } = useSelector((state) => state.admin);

  const analyticsItems = [
    {
      title: 'Total Bookings',
      value: statistics.totalBookings,
      icon: BookingIcon,
      color: '#1976d2'
    },
    {
      title: 'Active Trains',
      value: statistics.activeTrains,
      icon: TrainIcon,
      color: '#2e7d32'
    },
    {
      title: 'Cancelled Bookings',
      value: statistics.cancelledBookings,
      icon: CancelIcon,
      color: '#d32f2f'
    },
    {
      title: 'Total Revenue',
      value: `₹${statistics.totalRevenue || 0}`,
      icon: RevenueIcon,
      color: '#ed6c02'
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Booking Analytics
      </Typography>
      <Grid container spacing={3}>
        {analyticsItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%'
              }}
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
              <Typography variant="h4" component="div">
                {item.value}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingAnalytics; 
 
 
 
 
 
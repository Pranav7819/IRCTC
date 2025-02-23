import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardStatistics } from '../../store/slices/adminSlice';
import { Box, Typography, Paper, Grid, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px'
  }
}));

const StatItem = ({ title, value, color, percentage }) => (
  <StyledPaper sx={{ '&::after': { backgroundColor: color } }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4" sx={{ color: color }}>
      {value}
    </Typography>
    {percentage !== undefined && (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 8,
            borderRadius: 5,
            backgroundColor: `${color}20`,
            '& .MuiLinearProgress-bar': {
              backgroundColor: color
            }
          }}
        />
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          {percentage}% Occupancy
        </Typography>
      </Box>
    )}
  </StyledPaper>
);

const DashboardStatistics = () => {
  const dispatch = useDispatch();
  const { statistics, loading } = useSelector((state) => state.admin);
  const { trains } = useSelector((state) => state.trains);

  useEffect(() => {
    dispatch(getDashboardStatistics());
  }, [dispatch]);

  const calculateOccupancy = () => {
    if (!trains.length) return 0;
    const totalOccupancy = trains.reduce((acc, train) => {
      const totalSeats = train.classes.reduce((sum, cls) => sum + cls.totalSeats, 0);
      const availableSeats = train.classes.reduce((sum, cls) => sum + cls.availableSeats, 0);
      return acc + ((totalSeats - availableSeats) / totalSeats) * 100;
    }, 0);
    return Math.round(totalOccupancy / trains.length);
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatItem
            title="Total Bookings"
            value={statistics.totalBookings}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatItem
            title="Active Trains"
            value={statistics.activeTrains}
            color="#2e7d32"
            percentage={calculateOccupancy()}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatItem
            title="Cancelled Bookings"
            value={statistics.cancelledBookings}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatItem
            title="Total Revenue"
            value={`₹${statistics.totalRevenue || 0}`}
            color="#ed6c02"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStatistics; 
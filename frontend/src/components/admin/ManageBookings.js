import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookings, clearError } from '../../store/slices/bookingSlice';
import { Typography, Box, CircularProgress, Button } from '@mui/material';

const ManageBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  const handleCancelBooking = (bookingId) => {
    // Dispatch action to cancel booking
    // dispatch(cancelBooking(bookingId));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" align="center">Manage Bookings</Typography>
      {bookings.length === 0 ? (
        <Typography variant="h6" align="center">No bookings found.</Typography>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <Typography variant="body1">
                {booking.train.trainName} - {booking.travelDate.toString().slice(0, 10)}
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ mt: 1 }} 
                onClick={() => handleCancelBooking(booking._id)}
              >
                Cancel Booking
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default ManageBookings;
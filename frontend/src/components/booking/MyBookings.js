import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookings, clearError, cancelBooking } from '../../store/slices/bookingSlice';
import { Typography, Box, CircularProgress, Button, Modal } from '@mui/material';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const [open, setOpen] = React.useState(false);
  const [selectedBookingId, setSelectedBookingId] = React.useState(null);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBookingId(null);
  };

  const handleConfirmCancel = () => {
    dispatch(cancelBooking(selectedBookingId));
    handleClose();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" align="center">My Bookings</Typography>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Cancellation
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to cancel this booking?
          </Typography>
          <Button variant="contained" color="primary" onClick={handleConfirmCancel} sx={{ mt: 2 }}>
            Yes, Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ mt: 2, ml: 2 }}>
            No, Go Back
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MyBookings; 
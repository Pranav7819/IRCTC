import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  Alert
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.bookings);
  const bookingState = location.state;

  useEffect(() => {
    if (!bookingState) {
      navigate('/search', { replace: true });
    }
  }, [bookingState, navigate]);

  if (!bookingState) {
    return null;
  }

  const {
    train,
    passengers,
    totalFare,
    selectedClass
  } = bookingState;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <ConfirmationNumberIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1">
            Booking Confirmation
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Booking Status
            </Typography>
            <Typography color="success.main" variant="subtitle1" gutterBottom>
              Status: Confirmed
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Train Details
            </Typography>
            <Typography variant="body1">
              Train: {train?.trainName} ({train?.trainNumber})
            </Typography>
            <Typography variant="body1">
              From: {train?.source} - To: {train?.destination}
            </Typography>
            <Typography variant="body1">
              Date: {new Date(train?.departureTime).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              Class: {selectedClass?.type}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Passenger Details
            </Typography>
            {passengers.map((passenger, index) => (
              <Box key={index} mb={1}>
                <Typography variant="body1">
                  {passenger.firstName} {passenger.lastName} - Age: {passenger.age}, Gender: {passenger.gender}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Fare Details
            </Typography>
            <Typography variant="body1">
              Total Fare: ₹{totalFare}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/search')}
            color="primary"
          >
            Book Another Train
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingConfirmation;
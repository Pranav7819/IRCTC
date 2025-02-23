import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTrains, clearError } from '../../store/slices/trainSlice';
import { TextField, Button, Typography, Box, CircularProgress, Alert, Paper, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const TrainSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trains, loading, error } = useSelector((state) => state.trains);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
  });

  const { source, destination, date } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting search with:', formData);
    dispatch(searchTrains(formData));
  };

  const handleBooking = (trainId) => {
    console.log('Initiating booking for train:', trainId);
    navigate(`/booking/${trainId}`);
  };

  useEffect(() => {
    if (error) {
      console.error('Search error:', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3, position: 'relative' }}>
      {user?.role === 'admin' && (
        <Fab
          color="primary"
          aria-label="admin dashboard"
          onClick={() => navigate('/admin')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          <AdminPanelSettingsIcon />
        </Fab>
      )}
      <Typography variant="h4" align="center" gutterBottom>Search Trains</Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Source"
            name="source"
            value={source}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Destination"
            name="destination"
            value={destination}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Travel Date"
            name="date"
            type="date"
            value={date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Trains'}
          </Button>
        </form>
      </Paper>

      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 2 }} />}
      
      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {trains.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Available Trains:</Typography>
          {trains.map((train) => (
            <Box key={train._id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Typography variant="h6" color="primary">
                {train.trainName} ({train.trainNumber})
              </Typography>
              <Typography>
                From: {train.source} To: {train.destination}
              </Typography>
              <Typography>
                Departure: {new Date(train.departureTime).toLocaleString()}
              </Typography>
              <Typography>
                Available Classes:
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                {train.classes.map((cls) => (
                  <Typography key={cls.type}>
                    {cls.type} - Price: ₹{cls.price} (Available Seats: {cls.availableSeats})
                  </Typography>
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleBooking(train._id)}
                disabled={!train.classes.some(cls => cls.availableSeats > 0)}
              >
                {train.classes.some(cls => cls.availableSeats > 0) ? 'Book Now' : 'Sold Out'}
              </Button>
            </Box>
          ))}
        </Paper>
      )}

      {trains.length === 0 && !loading && (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          
        </Typography>
      )}

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Note: Available routes are from Mumbai to Chennai and from Delhi to Kolkata.
      </Typography>
    </Box>
  );
};

export default TrainSearch;
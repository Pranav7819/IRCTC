import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTrains,
  createTrain,
  updateTrain,
  deleteTrain,
  updateTrainStatus,
  clearError,
  clearSuccess
} from '../../store/slices/adminSlice';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ManageTrains = () => {
  const dispatch = useDispatch();
  const { trains, loading, error, success } = useSelector((state) => state.admin);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [formData, setFormData] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    classes: [{ type: '', price: '', totalSeats: '', availableSeats: '' }],
    daysOfOperation: []
  });

  useEffect(() => {
    dispatch(getAllTrains());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setOpenDialog(false);
      setSelectedTrain(null);
      setFormData({
        trainNumber: '',
        trainName: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        classes: [{ type: '', price: '', totalSeats: '', availableSeats: '' }],
        daysOfOperation: []
      });
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClassChange = (index, e) => {
    const newClasses = [...formData.classes];
    newClasses[index] = { ...newClasses[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, classes: newClasses });
  };

  const handleAddClass = () => {
    setFormData({
      ...formData,
      classes: [...formData.classes, { type: '', price: '', totalSeats: '', availableSeats: '' }]
    });
  };

  const handleRemoveClass = (index) => {
    const newClasses = formData.classes.filter((_, i) => i !== index);
    setFormData({ ...formData, classes: newClasses });
  };

  const handleDaysChange = (e) => {
    setFormData({ ...formData, daysOfOperation: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTrain) {
      dispatch(updateTrain({ id: selectedTrain._id, trainData: formData }));
    } else {
      dispatch(createTrain(formData));
    }
  };

  const handleEdit = (train) => {
    setSelectedTrain(train);
    setFormData({
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      source: train.source,
      destination: train.destination,
      departureTime: new Date(train.departureTime).toISOString().slice(0, 16),
      arrivalTime: new Date(train.arrivalTime).toISOString().slice(0, 16),
      classes: train.classes,
      daysOfOperation: train.daysOfOperation
    });
    setOpenDialog(true);
  };

  const handleDelete = (trainId) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      dispatch(deleteTrain(trainId));
    }
  };

  const handleStatusChange = (trainId, newStatus) => {
    dispatch(updateTrainStatus({ id: trainId, status: newStatus }));
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const classTypes = ['1A', '2A', '3A', 'SL', 'CC', 'EC'];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Manage Trains
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 3 }}
      >
        Add New Train
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {trains.map((train) => (
            <Grid item xs={12} key={train._id}>
              <Paper sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{train.trainName}</Typography>
                  <Box>
                    <IconButton onClick={() => handleEdit(train)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(train._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography>Train Number: {train.trainNumber}</Typography>
                <Typography>
                  Route: {train.source} to {train.destination}
                </Typography>
                <Typography>
                  Departure: {new Date(train.departureTime).toLocaleString()}
                </Typography>
                <Typography>
                  Status: 
                  <Select
                    value={train.status}
                    onChange={(e) => handleStatusChange(train._id, e.target.value)}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="Delayed">Delayed</MenuItem>
                  </Select>
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {train.daysOfOperation.map((day) => (
                    <Chip key={day} label={day} size="small" sx={{ mr: 0.5 }} />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTrain ? 'Edit Train' : 'Add New Train'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Train Number"
                  name="trainNumber"
                  value={formData.trainNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Train Name"
                  name="trainName"
                  value={formData.trainName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Departure Time"
                  name="departureTime"
                  type="datetime-local"
                  value={formData.departureTime}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Arrival Time"
                  name="arrivalTime"
                  type="datetime-local"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Days of Operation</InputLabel>
                  <Select
                    multiple
                    value={formData.daysOfOperation}
                    onChange={handleDaysChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 2 }}>Classes</Typography>
            {formData.classes.map((cls, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <InputLabel>Class Type</InputLabel>
                      <Select
                        name="type"
                        value={cls.type}
                        onChange={(e) => handleClassChange(index, e)}
                        required
                      >
                        {classTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      value={cls.price}
                      onChange={(e) => handleClassChange(index, e)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Total Seats"
                      name="totalSeats"
                      type="number"
                      value={cls.totalSeats}
                      onChange={(e) => handleClassChange(index, e)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Available Seats"
                      name="availableSeats"
                      type="number"
                      value={cls.availableSeats}
                      onChange={(e) => handleClassChange(index, e)}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                {formData.classes.length > 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveClass(index)}
                    sx={{ mt: 1 }}
                  >
                    Remove Class
                  </Button>
                )}
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddClass}
              sx={{ mb: 2 }}
            >
              Add Class
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedTrain ? 'Update Train' : 'Add Train'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageTrains; 
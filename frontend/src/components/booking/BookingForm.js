import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainById } from '../../store/slices/trainSlice';
import { createBooking, clearError } from '../../store/slices/bookingSlice';
import { TextField, Button, Typography, Box, CircularProgress, Stepper, Step, StepLabel } from '@mui/material';
import SeatSelection from './SeatSelection';
import FareCalculation from './FareCalculation';

const steps = ['Passenger Details', 'Select Class & Seats', 'Review & Pay'];

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trainId } = useParams();
  const { selectedTrain, loading: trainLoading, error: trainError } = useSelector((state) => state.trains);
  const { loading: bookingLoading, error: bookingError } = useSelector((state) => state.bookings);

  const [activeStep, setActiveStep] = useState(0);
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', age: '', gender: '' }]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [totalFare, setTotalFare] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    dispatch(getTrainById(trainId));
  }, [dispatch, trainId]);

  useEffect(() => {
    if (trainError) {
      alert(trainError);
      dispatch(clearError());
    }
  }, [trainError, dispatch]);

  const handlePassengerChange = (index, e) => {
    const newPassengers = [...passengers];
    newPassengers[index][e.target.name] = e.target.value;
    setPassengers(newPassengers);
    calculateTotalFare(newPassengers, selectedClass);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { firstName: '', lastName: '', age: '', gender: '' }]);
  };

  const handleRemovePassenger = (index) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(newPassengers);
    calculateTotalFare(newPassengers, selectedClass);
  };

  const handleClassChange = (e) => {
    const classType = e.target.value;
    const selectedClassData = selectedTrain.classes.find(cls => cls.type === classType);
    setSelectedClass(selectedClassData);
    calculateTotalFare(passengers, selectedClassData);
    setSelectedSeats([]); // Reset selected seats when class changes
  };

  const calculateTotalFare = (currentPassengers, currentClass) => {
    if (!currentClass) return;

    let total = 0;
    currentPassengers.forEach(passenger => {
      let discount = 0;
      if (passenger.age >= 60) {
        discount = 0.4; // 40% discount for senior citizens
      } else if (passenger.age <= 12) {
        discount = 0.5; // 50% discount for children
      }
      total += currentClass.price * (1 - discount);
    });
    setTotalFare(total);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      train: trainId,
      travelDate: selectedTrain?.departureTime,
      passengers,
      classType: selectedClass?.type,
      seats: selectedSeats,
      totalFare
    };
    console.log('Dispatching createBooking with data:', bookingData);
    dispatch(createBooking(bookingData));
  };

  useEffect(() => {
    if (bookingError) {
      alert(bookingError);
      dispatch(clearError());
    }
    if (!bookingLoading && !bookingError && selectedTrain) {
      if (activeStep === steps.length - 1) {
        navigate('/booking-confirmation', {
          state: {
            train: selectedTrain,
            passengers,
            totalFare,
            selectedClass,
            selectedSeats
          },
          replace: true
        });
      }
    }
  }, [bookingError, bookingLoading, dispatch, navigate, selectedTrain, passengers, totalFare, selectedClass, selectedSeats, activeStep]);

  if (trainLoading || !selectedTrain) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (trainError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">
          Error loading train details. Please try again.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/search')}
          sx={{ mt: 2 }}
        >
          Back to Search
        </Button>
      </Box>
    );
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {passengers.map((passenger, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">Passenger {index + 1}</Typography>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={passenger.firstName}
                  onChange={(e) => handlePassengerChange(index, e)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, e)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, e)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Gender"
                  name="gender"
                  select
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(index, e)}
                  fullWidth
                  margin="normal"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </TextField>
                {passengers.length > 1 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemovePassenger(index)}
                    sx={{ mt: 1 }}
                  >
                    Remove Passenger
                  </Button>
                )}
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPassenger}
              sx={{ mb: 2 }}
            >
              Add Passenger
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Select Class</Typography>
            <TextField
              select
              label="Travel Class"
              value={selectedClass?.type || ''}
              onChange={handleClassChange}
              fullWidth
              margin="normal"
              required
            >
              {selectedTrain?.classes.map((cls) => (
                <option key={cls.type} value={cls.type}>
                  {cls.type} - ₹{cls.price} ({cls.availableSeats} seats available)
                </option>
              ))}
            </TextField>
            <SeatSelection
              selectedClass={selectedClass}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              maxSeats={passengers.length}
            />
            <FareCalculation
              selectedClass={selectedClass}
              passengers={passengers}
              totalFare={totalFare}
              onClassChange={handleClassChange}
              classes={selectedTrain?.classes || []}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Booking</Typography>
            <Typography>Train: {selectedTrain?.trainName}</Typography>
            <Typography>Class: {selectedClass?.type}</Typography>
            <Typography>Selected Seats: {selectedSeats.join(', ')}</Typography>
            <Typography>Total Fare: ₹{totalFare}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Passenger Details:</Typography>
            {passengers.map((passenger, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography>
                  {passenger.firstName} {passenger.lastName} - Age: {passenger.age}, Gender: {passenger.gender}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit}>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={bookingLoading || !selectedClass || selectedSeats.length !== passengers.length}
            >
              {bookingLoading ? 'Processing...' : 'Confirm Booking'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && !passengers.every(p => p.firstName && p.lastName && p.age && p.gender)) ||
                (activeStep === 1 && (!selectedClass || selectedSeats.length !== passengers.length))
              }
            >
              Next
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default BookingForm;
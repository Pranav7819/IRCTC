import React from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';

const FareCalculation = ({ selectedClass, passengers, totalFare, onClassChange, classes }) => {
  const calculateDiscount = (passenger) => {
    if (passenger.age >= 60) {
      return 0.4; // 40% discount for senior citizens
    } else if (passenger.age <= 12) {
      return 0.5; // 50% discount for children
    }
    return 0;
  };

  const getFareBreakdown = () => {
    if (!selectedClass) return [];

    return passengers.map((passenger, index) => {
      const discount = calculateDiscount(passenger);
      const baseFare = selectedClass.price;
      const discountedFare = baseFare * (1 - discount);

      return {
        passenger: `Passenger ${index + 1}: ${passenger.firstName} ${passenger.lastName}`,
        baseFare,
        discount: discount * 100,
        final: discountedFare
      };
    });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        select
        label="Select Class"
        value={selectedClass?.type || ''}
        onChange={onClassChange}
        fullWidth
        margin="normal"
        required
      >
        {classes.map((cls) => (
          <option key={cls.type} value={cls.type}>
            {cls.type} - ₹{cls.price}
          </option>
        ))}
      </TextField>

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Fare Breakdown
        </Typography>
        {getFareBreakdown().map((fare, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              {fare.passenger}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Base Fare: ₹{fare.baseFare}
            </Typography>
            {fare.discount > 0 && (
              <Typography variant="body2" color="text.secondary">
                Discount: {fare.discount}%
              </Typography>
            )}
            <Typography variant="body2" color="primary">
              Final Fare: ₹{fare.final}
            </Typography>
          </Box>
        ))}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Fare: ₹{totalFare}
        </Typography>
      </Paper>
    </Box>
  );
};

export default FareCalculation; 
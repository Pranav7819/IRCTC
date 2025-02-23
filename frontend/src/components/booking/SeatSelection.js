import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const SeatSelection = ({ selectedClass, selectedSeats, setSelectedSeats, maxSeats }) => {
  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Generate seat layout based on class type
  const generateSeats = () => {
    const totalSeats = selectedClass?.totalSeats || 0;
    const rows = Math.ceil(totalSeats / 6); // 6 seats per row (3-3 configuration)
    const seatLayout = [];

    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      for (let seat = 0; seat < 6; seat++) {
        const seatNumber = row * 6 + seat + 1;
        if (seatNumber <= totalSeats) {
          const isSelected = selectedSeats.includes(seatNumber);
          const isAvailable = selectedClass?.availableSeats >= seatNumber;
          rowSeats.push({
            number: seatNumber,
            isSelected,
            isAvailable
          });
        }
      }
      seatLayout.push(rowSeats);
    }
    return seatLayout;
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Select Seats ({selectedSeats.length}/{maxSeats})
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <EventSeatIcon color="primary" />
          <Typography sx={{ ml: 1 }}>Available</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <EventSeatIcon color="secondary" />
          <Typography sx={{ ml: 1 }}>Selected</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EventSeatIcon color="disabled" />
          <Typography sx={{ ml: 1 }}>Booked</Typography>
        </Box>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {generateSeats().map((row, rowIndex) => (
          <Grid item xs={12} key={rowIndex}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {row.map((seat, seatIndex) => (
                <Button
                  key={seat.number}
                  variant={seat.isSelected ? "contained" : "outlined"}
                  color={seat.isAvailable ? (seat.isSelected ? "secondary" : "primary") : "inherit"}
                  disabled={!seat.isAvailable || (!seat.isSelected && selectedSeats.length >= maxSeats)}
                  onClick={() => handleSeatSelect(seat.number)}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    p: 0,
                    m: seatIndex === 2 ? '0 16px 0 0' : 0 // Add gap in middle of row
                  }}
                >
                  {seat.number}
                </Button>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeatSelection;
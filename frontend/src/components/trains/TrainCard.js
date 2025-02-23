import React from 'react';
import { Card, CardContent, Box, Typography, Button, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(45deg, #00A699 30%, #4DD6CB 90%)',
    borderRadius: '4px 4px 0 0',
  }
}));

const TrainCard = ({ train, onSelect }) => {
  const {
    trainName,
    trainNumber,
    departureTime,
    arrivalTime,
    source,
    destination,
    duration,
    price,
    availableSeats,
    classType
  } = train;

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {trainName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Train #{trainNumber}
            </Typography>
          </Box>
          <Chip
            label={classType}
            color="primary"
            size="small"
            sx={{ borderRadius: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h5">{departureTime}</Typography>
            <Typography variant="body2" color="text.secondary">{source}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2">{duration}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5">{arrivalTime}</Typography>
            <Typography variant="body2" color="text.secondary">{destination}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CurrencyPoundIcon sx={{ color: 'primary.main', mr: 0.5 }} />
              <Typography variant="h6" color="primary.main">
                {price}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AirlineSeatReclineNormalIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {availableSeats} seats left
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => onSelect(train)}
            sx={{
              minWidth: 120,
              background: 'linear-gradient(45deg, #00A699 30%, #4DD6CB 90%)',
            }}
          >
            Select
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TrainCard;
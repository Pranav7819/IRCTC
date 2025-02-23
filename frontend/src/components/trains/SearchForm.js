import React, { useState } from 'react';
import { Box, Paper, TextField, Button, IconButton, Typography, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
  maxWidth: 800,
  margin: '0 auto',
}));

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: null,
    passengers: '1',
    classType: 'All Classes'
  });

  const stations = [
    'London',
    'Manchester',
    'Birmingham',
    'Liverpool',
    'Edinburgh',
    'Glasgow',
    'Cardiff',
    'Bristol'
  ];

  const classTypes = ['All Classes', 'First Class', 'Second Class', 'Business'];

  const handleSwapStations = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <StyledPaper elevation={0}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Autocomplete
              fullWidth
              options={stations}
              value={formData.from}
              onChange={(_, value) => setFormData(prev => ({ ...prev, from: value || '' }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  required
                  placeholder="Enter departure station"
                />
              )}
            />
            <IconButton
              onClick={handleSwapStations}
              sx={{
                bgcolor: 'primary.light',
                color: 'white',
                '&:hover': { bgcolor: 'primary.main' },
              }}
            >
              <SwapHorizIcon />
            </IconButton>
            <Autocomplete
              fullWidth
              options={stations}
              value={formData.to}
              onChange={(_, value) => setFormData(prev => ({ ...prev, to: value || '' }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  required
                  placeholder="Enter arrival station"
                />
              )}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="Travel Date"
              value={formData.date}
              onChange={(newValue) => setFormData(prev => ({ ...prev, date: newValue }))}
              renderInput={(params) => <TextField {...params} fullWidth required />}
              disablePast
            />
            <Autocomplete
              fullWidth
              options={classTypes}
              value={formData.classType}
              onChange={(_, value) => setFormData(prev => ({ ...prev, classType: value || 'All Classes' }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Class"
                  required
                />
              )}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              minWidth: 200,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #00A699 30%, #4DD6CB 90%)',
            }}
          >
            Search Trains
          </Button>
        </Box>
      </form>
    </StyledPaper>
  );
};

export default SearchForm;
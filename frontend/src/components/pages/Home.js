import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, AppBar, Toolbar } from '@mui/material';
import { Train, Clock, MapPin, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mockTrains from '../../data/mockData';

const features = [
  {
    icon: <Train size={32} style={{ color: '#3B82F6' }} />,
    title: "Wide Network Coverage",
    description: "Access to thousands of routes across the country"
  },
  {
    icon: <Clock size={32} style={{ color: '#3B82F6' }} />,
    title: "Real-time Updates",
    description: "Get instant updates about your journey"
  },
  {
    icon: <MapPin size={32} style={{ color: '#3B82F6' }} />,
    title: "Easy Navigation",
    description: "User-friendly booking experience"
  },
  {
    icon: <Shield size={32} style={{ color: '#3B82F6' }} />,
    title: "Secure Booking",
    description: "Safe and encrypted transactions"
  }
];

const destinations = [
  {
    image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&q=80&w=800",
    title: "Mountain Routes",
    description: "Scenic railway journeys through mountains"
  },
  {
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800",
    title: "City Express",
    description: "Quick connections between major cities"
  },
  {
    image: "https://images.unsplash.com/photo-1683009427666-340595e57e43?auto=format&fit=crop&q=80&w=800",
    title: "Coastal Lines",
    description: "Beautiful seaside railway experiences"
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = (trainId) => {
    navigate(`/booking/${trainId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
           bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          animation: 'zoomEffect 20s infinite alternate',
          '@keyframes zoomEffect': {
            '0%': { transform: 'scale(1)' },
            '100%': { transform: 'scale(1.1)' }
          }
        }
      }}>
        <Box sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: 3
        }}>
          <Typography variant="h2" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            animation: 'fadeInDown 1s ease-out',
            '@keyframes fadeInDown': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}>
            Welcome to the Train Ticketing System
          </Typography>
          <Typography variant="h5" sx={{
            color: '#94A3B8',
            mb: 4,
            animation: 'fadeIn 1s ease-out 0.5s both',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}>
            Your one-stop solution for booking train tickets online!
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/search"
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '50px',
              background: 'linear-gradient(45deg, #3B82F6 30%, #60A5FA 90%)',
              boxShadow: '0 3px 5px 2px rgba(59, 130, 246, .3)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 10px 4px rgba(59, 130, 246, .3)'
              }
            }}
          >
            Book Your Journey
          </Button>
        </Box>
      </Box>

      {/* Popular Routes and Available Trains */}
      <Box sx={{ py: 8, px: 3 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, color: 'text.primary', fontWeight: 700 }}>
          Popular Routes & Available Trains
        </Typography>
        <Grid container spacing={4}>
          {mockTrains.map((train, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px -10px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease-in-out'
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)'
                }} />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
                    {train.trainName} ({train.trainNumber})
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">From</Typography>
                      <Typography variant="h6">{train.source}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle2" color="text.secondary">To</Typography>
                      <Typography variant="h6">{train.destination}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Available Classes:
                  </Typography>
                  <Grid container spacing={1}>
                    {train.classes.map((cls) => (
                      <Grid item xs={6} key={cls.type}>
                        <Box sx={{
                          p: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          textAlign: 'center'
                        }}>
                          <Typography variant="subtitle2" color="primary.main">
                            {cls.type}
                          </Typography>
                          <Typography variant="body2">
                            ₹{cls.price}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {cls.availableSeats} seats left
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      background: 'linear-gradient(45deg, #3B82F6 30%, #60A5FA 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2563EB 30%, #3B82F6 90%)'
                      }
                    }}
                    onClick={() => handleBookNow(train._id)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, px: 3, bgcolor: 'background.default' }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, color: 'text.primary', fontWeight: 700 }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3
              }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ mb: 1, color: 'text.primary', fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
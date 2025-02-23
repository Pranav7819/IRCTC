import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { loadUser } from './store/slices/authSlice';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'; // Importing Home component
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TrainSearch from './components/trains/TrainSearch';
import BookingForm from './components/booking/BookingForm';
import MyBookings from './components/booking/MyBookings';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import BookingConfirmation from './components/booking/BookingConfirmation';

// Create theme with modern design system
const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F3F4F6',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#4B5563'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }
        },
        contained: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  }
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token and load user
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/search" 
              element={
                <PrivateRoute>
                  <TrainSearch />
                </PrivateRoute>
              } 
            />
            <Route
              path="/booking/:trainId"
              element={
                <PrivateRoute>
                  <BookingForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/booking-confirmation"
              element={
                <PrivateRoute>
                  <BookingConfirmation />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
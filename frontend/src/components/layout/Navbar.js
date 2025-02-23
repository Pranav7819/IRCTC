import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 600,
              letterSpacing: '0.5px',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            Train Ticketing System
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/search"
              sx={{
                borderRadius: '8px',
                px: 2,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Search Trains
            </Button>
            {user?.role === 'admin' && (
              <Button
                color="inherit"
                component={RouterLink}
                to="/admin"
                sx={{
                  borderRadius: '8px',
                  px: 2,
                  fontWeight: 500,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                Admin Dashboard
              </Button>
            )}

            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'inherit',
                    fontWeight: 500
                  }}
                >
                  {user?.name || 'User'}
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{
                    ml: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1,
                      minWidth: 180,
                      borderRadius: 2
                    }
                  }}
                >
                  {user?.role === 'admin' && (
                    <MenuItem
                      component={RouterLink}
                      to="/admin"
                      onClick={handleClose}
                      sx={{ py: 1.5 }}
                    >
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ py: 1.5 }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    borderRadius: '8px',
                    px: 2,
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    borderRadius: '8px',
                    px: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'primary.main',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)'
                    }
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
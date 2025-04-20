import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem,
  useScrollTrigger,
  Slide,
  Badge,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaCarSide, FaUser, FaSearch, FaBars, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Hide navbar on scroll down
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would validate the token and get user info
      setUser({ username: 'User' });
    }
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    handleClose();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="bg-secondary text-white text-xs py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-1 text-primary" />
              <span>1800 258 5656</span>
            </div>
            <div className="hidden md:flex items-center">
              <FaMapMarkerAlt className="mr-1 text-primary" />
              <span>Service Centers</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Careers</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>

      <AppBar position="sticky" className="bg-white shadow-sm" elevation={0} color="transparent">
        <Toolbar className="container mx-auto px-4 py-2">
          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center">
              <FaCarSide className="text-primary text-3xl mr-2" />
              <span className="text-2xl font-bold text-secondary">
                Auto<span className="text-primary">Vista</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              component={Link} 
              to="/cars" 
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              Buy Car
            </Button>
            <Button 
              component={Link} 
              to="/sell" 
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              Sell Car
            </Button>
            <Button 
              component={Link} 
              to="/financing" 
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              Financing
            </Button>
            {user ? (
              <Button 
                component={Link} 
                to="/favorites"
                className="text-secondary font-medium hover:text-primary transition-colors"
                startIcon={<FaHeart />}
              >
                Saved Cars
              </Button>
            ) : null}
          </div>

          {/* User Menu */}
          <div className="ml-4 flex items-center space-x-2">
            {/* Search Button - Desktop */}
            <div className="hidden md:block">
              <TextField
                placeholder="Search cars, brands..."
                size="small"
                className="w-48"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch className="text-gray-500" />
                    </InputAdornment>
                  ),
                  className: "rounded-full bg-light border-0",
                }}
              />
            </div>

            {user ? (
              <>
                <IconButton 
                  onClick={handleProfileClick} 
                  aria-label="user profile"
                  className="hover:bg-light"
                >
                  <Avatar className="bg-primary text-white" alt={user.username} src={user.avatar}>
                    {user.username.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  elevation={2}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      borderRadius: '10px',
                      minWidth: '200px',
                    }
                  }}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>
                    My Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/my-orders" onClick={handleClose}>
                    My Orders
                  </MenuItem>
                  <MenuItem component={Link} to="/favorites" onClick={handleClose}>
                    Saved Cars
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                component={Link} 
                to="/login"
                variant="contained"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-5"
                startIcon={<FaUser />}
              >
                Login / Sign Up
              </Button>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <IconButton 
                onClick={toggleMobileMenu}
                edge="end" 
                color="inherit" 
                aria-label="menu"
                className="text-secondary"
              >
                <FaBars />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t shadow-lg"
          >
            <div className="container mx-auto py-4 px-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <TextField
                  placeholder="Search cars, brands..."
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaSearch className="text-gray-500" />
                      </InputAdornment>
                    ),
                    className: "rounded-full bg-light border-0",
                  }}
                />
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button 
                  component={Link} 
                  to="/cars" 
                  fullWidth 
                  onClick={() => setMobileMenuOpen(false)}
                  className="justify-start text-secondary hover:text-primary py-2"
                >
                  Buy Car
                </Button>
                <Button 
                  component={Link} 
                  to="/sell" 
                  fullWidth 
                  onClick={() => setMobileMenuOpen(false)}
                  className="justify-start text-secondary hover:text-primary py-2"
                >
                  Sell Car
                </Button>
                <Button 
                  component={Link} 
                  to="/financing" 
                  fullWidth 
                  onClick={() => setMobileMenuOpen(false)}
                  className="justify-start text-secondary hover:text-primary py-2"
                >
                  Financing
                </Button>
                {user && (
                  <Button 
                    component={Link} 
                    to="/favorites" 
                    fullWidth 
                    onClick={() => setMobileMenuOpen(false)}
                    className="justify-start text-secondary hover:text-primary py-2"
                    startIcon={<FaHeart className="text-primary" />}
                  >
                    Saved Cars
                  </Button>
                )}
                
                {!user && (
                  <Button 
                    component={Link} 
                    to="/login" 
                    fullWidth 
                    onClick={() => setMobileMenuOpen(false)}
                    variant="contained"
                    className="bg-primary text-white mt-4"
                    startIcon={<FaUser />}
                  >
                    Login / Sign Up
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

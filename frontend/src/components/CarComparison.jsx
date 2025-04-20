import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  IconButton, 
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExchangeAlt, FaChevronRight, FaCheck, FaBolt, FaGasPump, FaCog, FaTachometerAlt, FaCalendarAlt, FaRoad, FaRupeeSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const featureList = [
  { id: 'price', name: 'Price', icon: <FaRupeeSign /> },
  { id: 'year', name: 'Year', icon: <FaCalendarAlt /> },
  { id: 'mileage', name: 'Mileage', icon: <FaRoad /> },
  { id: 'engine', name: 'Engine', icon: <FaCog /> }, 
  { id: 'fuelType', name: 'Fuel Type', icon: <FaGasPump /> },
  { id: 'transmission', name: 'Transmission', icon: <FaExchangeAlt /> },
  { id: 'power', name: 'Power', icon: <FaBolt /> },
  { id: 'topSpeed', name: 'Top Speed', icon: <FaTachometerAlt /> }
];

const CarComparison = ({ cars = [], onRemoveCar }) => {
  const formatIndianPrice = (price) => {
    return price.toLocaleString('en-IN');
  };
  
  if (cars.length === 0) {
    return (
      <Container maxWidth="lg" className="py-12">
        <Paper className="p-8 rounded-xl bg-white shadow-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box className="flex justify-center mb-6">
              <Box className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center">
                <FaExchangeAlt className="text-3xl text-secondary" />
              </Box>
            </Box>
            
            <Typography variant="h4" component="h1" className="font-heading font-bold text-secondary mb-3">
              Car Comparison
            </Typography>
            
            <Typography className="text-muted max-w-xl mx-auto mb-8">
              Add cars to compare their specifications, features, and prices side by side to make the right choice for your next vehicle.
            </Typography>
            
            <Button 
              component={Link}
              to="/cars"
              variant="contained" 
              className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Browse Cars to Compare
            </Button>
          </motion.div>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-10">
      <Box className="mb-6">
        <Typography variant="h4" component="h1" className="font-heading font-bold text-secondary mb-2">
          Compare Cars
        </Typography>
        <Typography className="text-muted">
          Side-by-side comparison of {cars.length} vehicles
        </Typography>
      </Box>

      <Paper className="overflow-hidden rounded-xl shadow-premium mb-8">
        {/* Car Image Headers */}
        <Box className="bg-gradient-premium text-white p-6">
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography className="font-semibold pt-2">Vehicle</Typography>
            </Grid>
            
            {cars.map((car) => (
              <Grid item xs={12 / Math.min(cars.length + 1, 4)} key={car._id}>
                <Box className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm p-2 h-40"
                  >
                    <img 
                      src={car.images[0]} 
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-contain"
                    />
                    <Tooltip title="Remove from comparison">
                      <IconButton 
                        size="small"
                        className="absolute top-1 right-1 bg-black/20 text-white hover:bg-black/40"
                        onClick={() => onRemoveCar(car._id)}
                      >
                        <FaTimes size={14} />
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                  
                  <Typography className="font-semibold text-center mt-3 text-white">
                    {car.make} {car.model}
                  </Typography>
                  <Typography className="text-center text-white/80 text-sm">
                    {car.year} • {car.fuelType}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Price Section */}
        <Box className="p-6 bg-light">
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box className="flex items-center">
                <FaRupeeSign className="text-primary mr-2" />
                <Typography className="font-semibold text-secondary">Price</Typography>
              </Box>
            </Grid>
            
            {cars.map((car) => (
              <Grid item xs={12 / Math.min(cars.length + 1, 4)} key={car._id}>
                <Typography className="font-bold text-xl text-primary">
                  ₹{formatIndianPrice(car.price)}
                </Typography>
                <Typography className="text-muted text-sm">
                  EMI from ₹{Math.round(car.price / 60).toLocaleString('en-IN')}/mo
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Divider />
        
        {/* Specifications */}
        <TableContainer>
          <Table>
            <TableBody>
              {featureList.map((feature) => (
                <TableRow key={feature.id} className="hover:bg-light/80">
                  <TableCell className="border-r w-1/4">
                    <Box className="flex items-center">
                      <span className="text-primary mr-2">{feature.icon}</span>
                      <Typography className="font-medium text-secondary">
                        {feature.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  {cars.map((car) => {
                    let value = car[feature.id];
                    
                    // Format based on feature type
                    if (feature.id === 'price') {
                      value = `₹${formatIndianPrice(car.price)}`;
                    } else if (feature.id === 'mileage') {
                      value = `${car.mileage.toLocaleString()} km`;
                    } else if (feature.id === 'power') {
                      // Simulated data since we don't have power field
                      value = `${(Math.random() * 100 + 70).toFixed(0)} bhp`;
                    } else if (feature.id === 'engine') {
                      // Simulated data since we don't have engine field
                      const cc = car.fuelType === 'Electric' ? 'Electric Motor' : `${(Math.random() * 1000 + 1000).toFixed(0)} cc`;
                      value = cc;
                    } else if (feature.id === 'topSpeed') {
                      // Simulated data since we don't have topSpeed field
                      value = car.fuelType === 'Electric' ? '140 km/h' : `${(Math.random() * 60 + 160).toFixed(0)} km/h`;
                    }
                    
                    return (
                      <TableCell key={`${car._id}-${feature.id}`} className={`text-center ${car.fuelType === 'Electric' && feature.id === 'fuelType' ? 'text-success font-medium' : ''}`}>
                        {value !== undefined ? value : 'N/A'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Call to Action */}
        <Box className="p-6 bg-light">
          <Grid container spacing={3}>
            <Grid item xs={3}></Grid>
            
            {cars.map((car) => (
              <Grid item xs={12 / Math.min(cars.length + 1, 4)} key={car._id} className="text-center">
                <Button 
                  component={Link}
                  to={`/cars/${car._id}`}
                  variant="contained" 
                  className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  View Details
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
      
      <Box className="flex justify-center">
        <Button 
          component={Link}
          to="/cars"
          variant="outlined" 
          className="border-secondary text-secondary hover:bg-secondary/5 font-medium px-6 py-2 rounded-lg"
          startIcon={<FaExchangeAlt />}
        >
          Compare More Cars
        </Button>
      </Box>
    </Container>
  );
};

export default CarComparison;

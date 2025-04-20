import React from 'react';
import { Card, Typography, Box, Chip, IconButton, Tooltip, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaGasPump, FaRoad, FaHeart, FaRegHeart, FaExchangeAlt, FaRegCheckCircle, FaTachometerAlt, FaBolt, FaMapMarkerAlt, FaRupeeSign, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './CarCard.css';

const CarCard = ({ car, onToggleFavorite, onAddToCompare, isFavorite, inCompare }) => {
  const { _id, make, model, year, price, images, mileage, transmission, fuelType, condition, location } = car;

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakhs`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const calculateEmi = (price) => {
    // Simple EMI calculation: P x R x (1+R)^N / ((1+R)^N - 1)
    // Where P = Principal, R = Monthly interest rate, N = Number of months
    const principal = price;
    const interestRate = 0.008; // 9.6% per annum, 0.8% per month
    const tenure = 60; // 5 years
    
    const emi = principal * interestRate * Math.pow(1 + interestRate, tenure) / (Math.pow(1 + interestRate, tenure) - 1);
    return Math.round(emi);
  };

  // Get fuel type class for styling
  const getFuelTypeClass = () => {
    switch(fuelType?.toLowerCase()) {
      case 'petrol':
        return 'fuel-type-petrol';
      case 'diesel':
        return 'fuel-type-diesel';
      case 'electric':
        return 'fuel-type-electric';
      case 'hybrid':
        return 'fuel-type-hybrid';
      case 'cng':
        return 'fuel-type-cng';
      default:
        return 'fuel-type-default';
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="car-card-wrapper"
    >
      <Card className="car-card">
        {/* Card Header with Badge and Actions */}
        <Box className="car-image-container">
          {/* Main Image */}
          <img
            src={images?.[0] || 'https://via.placeholder.com/400x300/f5f5f5/ff3e41?text=AutoVista'}
            alt={`${make} ${model}`}
            className="car-image"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <Box className="image-overlay"></Box>
          
          {/* Certified Badge */}
          <Box className="certified-badge-container">
            <Chip 
              icon={<FaRegCheckCircle className="badge-icon" />} 
              label="Certified" 
              size="small"
              className="certified-badge"
            />
          </Box>
          
          {/* Action Buttons */}
          <Box className="action-buttons">
            <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
              <IconButton 
                onClick={() => onToggleFavorite(_id)}
                className="action-button"
                size="small"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? <FaHeart className="favorite-active" /> : <FaRegHeart />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title={inCompare ? "Remove from Compare" : "Add to Compare"}>
              <IconButton 
                onClick={() => onAddToCompare(car)}
                className="action-button"
                size="small"
                aria-label={inCompare ? "Remove from compare" : "Add to compare"}
              >
                <FaExchangeAlt className={inCompare ? "compare-active" : ""} />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Price Tag */}
          <Box className="price-tag">
            <Typography className="price">
              <FaRupeeSign className="rupee-icon" />
              {formatPrice(price)}
            </Typography>
            <Typography className="emi">
              EMI from ₹{calculateEmi(price).toLocaleString('en-IN')}/mo
            </Typography>
          </Box>
        </Box>
        
        {/* Card Content */}
        <Box className="car-details">
          {/* Car Title & Location */}
          <Box className="car-title-container">
            <Typography variant="h6" className="car-title">
              {make} {model} 
              <span className="car-year">{year}</span>
            </Typography>
            
            <Typography className="car-location">
              <FaMapMarkerAlt className="location-icon" /> {location}
            </Typography>
          </Box>
          
          {/* Specs Grid */}
          <Box className="car-specs">
            <Box className="spec-item">
              <Box className="spec-icon-container">
                <FaRoad className="spec-icon" />
              </Box>
              <span>{mileage.toLocaleString()} km</span>
            </Box>
            
            <Box className="spec-item">
              <Box className="spec-icon-container">
                <FaGasPump className="spec-icon" />
              </Box>
              <span className={`fuel-type-pill ${getFuelTypeClass()}`}>{fuelType}</span>
            </Box>
            
            <Box className="spec-item">
              <Box className="spec-icon-container">
                <FaCog className="spec-icon" />
              </Box>
              <span>{transmission}</span>
            </Box>
            
            <Box className="spec-item">
              <Box className="spec-icon-container">
                <FaBolt className="spec-icon" />
              </Box>
              <span>{condition}</span>
            </Box>
          </Box>
          
          {/* Footer */}
          <Box className="car-footer">
            <Chip 
              label={fuelType} 
              size="small" 
              className={`fuel-chip ${getFuelTypeClass()}`}
            />
            
            <Link 
              to={`/cars/${_id}`} 
              className="view-details-link"
            >
              View Details
            </Link>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

export default CarCard;

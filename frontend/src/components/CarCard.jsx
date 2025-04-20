import React from 'react';
import { Card, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaExchangeAlt, FaRupeeSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CarCard = ({ car, onToggleFavorite, onAddToCompare, isFavorite, inCompare }) => {
  const { _id, make, model, year, price, images, fuelType } = car;

  const formatIndianPrice = (price) => {
    const priceStr = price.toString();
    let formattedPrice = '';
    
    if (priceStr.length > 5) {
      const lastThree = priceStr.substring(priceStr.length - 3);
      const remaining = priceStr.substring(0, priceStr.length - 3);
      
      let formatted = '';
      for (let i = remaining.length; i > 0; i -= 2) {
        formatted = (i > 2 ? ',' : '') + remaining.substring(Math.max(0, i - 2), i) + formatted;
      }
      
      formattedPrice = formatted + ',' + lastThree;
    } else {
      const lastThree = priceStr.substring(priceStr.length - 3);
      const remaining = priceStr.substring(0, priceStr.length - 3);
      formattedPrice = remaining + ',' + lastThree;
    }
    
    return formattedPrice;
  };

  // Colors based on fuel type
  const getFuelTypeColor = () => {
    switch(fuelType?.toLowerCase()) {
      case 'petrol':
        return 'bg-green-100 text-green-800';
      case 'diesel':
        return 'bg-blue-100 text-blue-800';
      case 'electric':
        return 'bg-purple-100 text-purple-800';
      case 'hybrid':
        return 'bg-teal-100 text-teal-800';
      case 'cng':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
        {/* Card Image Section */}
        <Box className="relative">
          {/* Main Image - Full width with fixed height */}
          <Box className="relative h-[200px] overflow-hidden">
            <img
              src={images?.[0] || 'https://via.placeholder.com/400x300/f5f5f5/ff3e41?text=AutoVista'}
              alt={`${make} ${model}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Action Buttons */}
            <Box className="absolute top-3 right-3 flex space-x-2">
              <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                <IconButton 
                  onClick={() => onToggleFavorite(_id)}
                  className="bg-white text-gray-800 hover:text-primary shadow-md"
                  size="small"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? <FaHeart className="text-[#E63946]" /> : <FaRegHeart />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title={inCompare ? "Remove from Compare" : "Add to Compare"}>
                <IconButton 
                  onClick={() => onAddToCompare(car)}
                  className="bg-white text-gray-800 hover:text-accent shadow-md"
                  size="small"
                  aria-label={inCompare ? "Remove from compare" : "Add to compare"}
                >
                  <FaExchangeAlt className={inCompare ? "text-[#F8C630]" : ""} />
                </IconButton>
              </Tooltip>
            </Box>
            
            {/* Fuel Type Badge */}
            <Box className="absolute top-3 left-3">
              <Chip 
                label={fuelType?.toUpperCase()} 
                size="small" 
                className={`${getFuelTypeColor()} font-medium text-xs px-2`}
              />
            </Box>
          </Box>
        </Box>
        
        {/* Card Content */}
        <Box className="p-4 flex flex-col gap-4">
          {/* Car Name */}
          <Typography 
            component="h3" 
            className="font-bold text-[1.1rem] mt-2 text-black"
          >
            {make} {model} <span className="text-sm font-medium text-gray-700">{year}</span>
          </Typography>
          
          {/* Price */}
          <Typography 
            component="h2" 
            className="font-bold text-[1.4rem] text-[#1D3557] flex items-center"
          >
            <FaRupeeSign className="mr-1 text-lg" />
            {formatIndianPrice(price)}
          </Typography>
          
          {/* View Details Button */}
          <Link 
            to={`/cars/${_id}`} 
            className="w-full bg-[#E63946] text-white py-2 px-4 rounded-md text-center font-medium hover:bg-[#d12836] transition-colors mt-auto"
          >
            View Details
          </Link>
        </Box>
      </Card>
    </motion.div>
  );
};

export default CarCard;

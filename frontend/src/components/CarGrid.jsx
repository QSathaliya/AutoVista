import React from 'react';
import { Grid, Typography, Box, Skeleton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const CarGrid = ({ 
  cars = [], 
  title, 
  loading = false, 
  onToggleFavorite, 
  onAddToCompare, 
  favorites = [],
  viewAllLink,
  compact = false
}) => {
  if (loading) {
    return (
      <Box className="mb-8">
        {title && (
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h5" component="h2" className="font-bold text-secondary">
              {title}
            </Typography>
            
            {viewAllLink && (
              <Link to={viewAllLink} className="flex items-center text-primary font-medium hover:underline">
                View All <FaChevronRight className="ml-1" />
              </Link>
            )}
          </Box>
        )}
        <Grid container spacing={3}>
          {[...Array(compact ? 4 : 6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={compact ? 3 : 4} key={index}>
              <Skeleton variant="rectangular" height={240} className="rounded-lg" />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (cars.length === 0 && !loading) {
    return (
      <Box className="mb-8">
        {title && (
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h5" component="h2" className="font-bold text-secondary">
              {title}
            </Typography>
          </Box>
        )}
        <Box className="py-12 text-center bg-white rounded-lg shadow-sm">
          <Typography variant="h6" className="text-gray-600 mb-2">
            No cars available in this category
          </Typography>
          <Typography className="text-gray-500 mb-4">
            Try checking back later or explore other categories
          </Typography>
          <Button 
            component={Link} 
            to="/cars" 
            variant="contained"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Browse All Cars
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="mb-8">
      {title && (
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h5" component="h2" className="font-bold text-secondary">
            {title}
          </Typography>
          
          {viewAllLink && (
            <Link to={viewAllLink} className="flex items-center text-primary font-medium hover:underline">
              View All <FaChevronRight className="ml-1" />
            </Link>
          )}
        </Box>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={compact ? 3 : 4} key={car._id}>
              <motion.div variants={itemVariants}>
                <CarCard
                  car={car}
                  onToggleFavorite={onToggleFavorite}
                  onAddToCompare={onAddToCompare}
                  isFavorite={favorites.includes(car._id)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default CarGrid;

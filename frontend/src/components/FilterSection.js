import React from 'react';
import { TextField, MenuItem, Box, Typography } from '@mui/material';
import './FilterSection.css';

const FilterSection = ({ filters, onFilterChange }) => {
  const priceRanges = [
    { value: '', label: 'Any' },
    { value: '0-10000', label: 'Under ₹10,000' },
    { value: '10000-30000', label: '₹10,000 - ₹30,000' },
    { value: '30000-50000', label: '₹30,000 - ₹50,000' },
    { value: '50000+', label: 'Over ₹50,000' }
  ];

  const years = [
    { value: '', label: 'Any' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' }
  ];

  const fuelTypes = [
    { value: '', label: 'Any' },
    { value: 'Petrol', label: 'Petrol' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Electric', label: 'Electric' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];

  const transmissions = [
    { value: '', label: 'Any' },
    { value: 'Automatic', label: 'Automatic' },
    { value: 'Manual', label: 'Manual' }
  ];

  return (
    <Box className="filter-section">
      <Typography variant="h6" className="filter-title">
        Filters
      </Typography>
      
      <Box className="filter-group">
        <TextField
          select
          fullWidth
          label="Make"
          name="make"
          value={filters.make}
          onChange={onFilterChange}
          className="filter-select"
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="Toyota">Toyota</MenuItem>
          <MenuItem value="Honda">Honda</MenuItem>
          <MenuItem value="BMW">BMW</MenuItem>
          <MenuItem value="Mercedes">Mercedes</MenuItem>
          <MenuItem value="Audi">Audi</MenuItem>
        </TextField>
      </Box>

      <Box className="filter-group">
        <TextField
          select
          fullWidth
          label="Model"
          name="model"
          value={filters.model}
          onChange={onFilterChange}
          className="filter-select"
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="Camry">Camry</MenuItem>
          <MenuItem value="Civic">Civic</MenuItem>
          <MenuItem value="3 Series">3 Series</MenuItem>
          <MenuItem value="C-Class">C-Class</MenuItem>
          <MenuItem value="A4">A4</MenuItem>
        </TextField>
      </Box>

      <Box className="filter-group">
        <TextField
          select
          fullWidth
          label="Price Range"
          name="priceRange"
          value={filters.priceRange}
          onChange={onFilterChange}
          className="filter-select"
        >
          {priceRanges.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box className="filter-group">
        <TextField
          select
          fullWidth
          label="Year"
          name="year"
          value={filters.year}
          onChange={onFilterChange}
          className="filter-select"
        >
          {years.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box className="filter-group">
        <TextField
          select
          fullWidth
          label="Fuel Type"
          name="fuelType"
          value={filters.fuelType}
          onChange={onFilterChange}
          className="filter-select"
        >
          {fuelTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box className="filter-group">
        <TextField
          select
          fullWidth
          label="Transmission"
          name="transmission"
          value={filters.transmission}
          onChange={onFilterChange}
          className="filter-select"
        >
          {transmissions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

export default FilterSection; 
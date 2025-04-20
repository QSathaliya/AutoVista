import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, Paper, Box } from '@mui/material';
import { 
  FaGasPump, FaCog, FaTachometerAlt, FaCalendarAlt, FaTimes,
  FaRuler, FaCar, FaRulerHorizontal, FaRulerVertical, FaArrowsAltH,
  FaRupeeSign, FaRegCalendarAlt, FaHorseHead, FaBolt, FaUsers,
  FaShieldAlt, FaTablet, FaSnowflake, FaWarehouse, FaGasBump
} from 'react-icons/fa';
import './Compare.css';

const Compare = () => {
  const [compareCars, setCompareCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cars from localStorage
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    
    // Add default values for missing specifications
    const enhancedList = compareList.map(car => ({
      ...car,
      // Basic specs
      fuelType: car.fuelType || 'Petrol',
      transmission: car.transmission || 'Manual',
      mileage: car.mileage || '20',
      
      // Price & Value
      price: car.price || 1000000,
      emi: car.emi || '15,000',
      warranty: car.warranty || '2 Years',
      
      // Engine specs
      engine_type: car.engine_type || (car.fuelType === 'Electric' ? 'Electric Motor' : `${car.fuelType} Engine`),
      displacement: car.displacement || (car.fuelType === 'Electric' ? '40 kWh Battery' : '1500 cc'),
      power: car.power || '90 bhp',
      torque: car.torque || '110 Nm',
      
      // Features
      seating: car.seating || '5',
      airbags: car.airbags || '2',
      infotainment: car.infotainment || '7-inch Touchscreen',
      ac: car.ac || 'Manual'
    }));
    
    setCompareCars(enhancedList);
    setIsLoading(false);
  }, []);

  const handleRemoveCar = (carId) => {
    const updatedList = compareCars.filter(car => car.id.toString() !== carId.toString());
    setCompareCars(updatedList);
    localStorage.setItem('compareList', JSON.stringify(updatedList));
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakhs`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  if (isLoading) {
    return (
      <Container className="compare-empty">
        <Typography variant="h5" align="center" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (compareCars.length === 0) {
    return (
      <Container className="compare-empty">
        <Typography variant="h5" align="center" gutterBottom>
          No Cars to Compare
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Add cars from the car details page to compare them side by side.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          className="browse-cars-btn"
          href="/cars"
        >
          Browse Cars
        </Button>
      </Container>
    );
  }

  // Single comprehensive list of all specifications
  const allSpecifications = [
    // Basic Information
    { icon: <FaCalendarAlt />, label: 'Year', key: 'year' },
    { icon: <FaGasPump />, label: 'Fuel Type', key: 'fuelType' },
    { icon: <FaCog />, label: 'Transmission', key: 'transmission' },
    { icon: <FaTachometerAlt />, label: 'Mileage', key: 'mileage', unit: 'km' },
    
    // Price & Value
    { icon: <FaRupeeSign />, label: 'Price', key: 'price', format: (value) => formatPrice(value) },
    { icon: <FaRupeeSign />, label: 'EMI', key: 'emi', format: (value) => `₹${value}/mo` },
    { icon: <FaRegCalendarAlt />, label: 'Warranty', key: 'warranty' },
    
    // Engine & Performance
    { icon: <FaCar />, label: 'Engine Type', key: 'engine_type' },
    { icon: <FaTachometerAlt />, label: 'Displacement', key: 'displacement' },
    { icon: <FaHorseHead />, label: 'Power', key: 'power' },
    { icon: <FaBolt />, label: 'Torque', key: 'torque' },
    
    // Features
    { icon: <FaUsers />, label: 'Seating Capacity', key: 'seating' },
    { icon: <FaShieldAlt />, label: 'Airbags', key: 'airbags' },
    { icon: <FaTablet />, label: 'Infotainment', key: 'infotainment' },
    { icon: <FaSnowflake />, label: 'AC', key: 'ac' }
  ];

  return (
    <Container className="compare-container">
      <Typography variant="h4" gutterBottom className="compare-title">
        Compare Cars
        <span className="cars-count">({compareCars.length} cars)</span>
      </Typography>

      {/* Car Cards at the top */}
      <Grid container spacing={3} className="car-cards-container" sx={{ mb: 4 }}>
        {compareCars.map((car) => (
          <Grid item xs={12} sm={6} md={12 / compareCars.length} key={car.id}>
            <Paper elevation={3} className="car-card">
              <Button 
                className="remove-btn"
                onClick={() => handleRemoveCar(car.id)}
                aria-label="Remove car"
                size="small"
              >
                <FaTimes />
              </Button>
              <img 
                src={car.image} 
                alt={`${car.make} ${car.model}`} 
                className="car-img"
              />
              <Box className="car-details">
                <Typography variant="h6" className="car-name">
                  {car.make} {car.model}
                </Typography>
                <Typography variant="subtitle1" className="car-year">
                  {car.year}
                </Typography>
                <Typography variant="h6" className="car-price">
                  {formatPrice(car.price)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Comparison Table */}
      <Paper elevation={3} className="comparison-table-container">
        <Typography variant="h6" className="table-title">
          Car Specifications
        </Typography>
        
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="spec-header">Specification</th>
                {compareCars.map((car) => (
                  <th key={car.id} className="car-column-header">
                    {car.make} {car.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSpecifications.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td className="spec-cell">
                    <span className="spec-icon">{spec.icon}</span>
                    <span className="spec-label">{spec.label}</span>
                  </td>
                  
                  {compareCars.map((car) => {
                    let value;
                    if (spec.format) {
                      value = spec.format(car[spec.key]);
                    } else if (spec.unit) {
                      value = car[spec.key] ? `${car[spec.key]} ${spec.unit}` : '-';
                    } else {
                      value = car[spec.key] || '-';
                    }
                    
                    return (
                      <td key={car.id} className="value-cell">
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </Container>
  );
};

export default Compare;

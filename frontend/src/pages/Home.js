import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { FaSearch, FaShieldAlt, FaCar, FaMoneyBillWave, FaStar, FaCarAlt, FaTags, FaMobile, FaCheckCircle, FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Components
import Hero from '../components/Hero';

// CSS
import './Home.css';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [budgetCars, setBudgetCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const whyChooseFeatures = [
    {
      title: 'Certified Cars',
      description: 'All cars undergo a rigorous 140+ point inspection to ensure quality and reliability.',
      icon: <FaShieldAlt className="feature-primary-icon" />
    },
    {
      title: 'Best Prices',
      description: 'Transparent pricing with no hidden charges. Get the best value for your money.',
      icon: <FaMoneyBillWave className="feature-primary-icon" />
    },
    {
      title: 'Easy Financing',
      description: 'Quick loan approvals with lowest interest rates from multiple banking partners.',
      icon: <FaTags className="feature-primary-icon" />
    },
    {
      title: 'Hassle-Free Experience',
      description: 'We handle all the paperwork and provide end-to-end assistance for a smooth experience.',
      icon: <FaCarAlt className="feature-primary-icon" />
    }
  ];

  // Update the categories data with more diverse options
  const updatedCategories = [
    { 
      id: 'suv', 
      title: 'SUVs', 
      description: 'Spacious and powerful SUVs for family adventures', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'sedan', 
      title: 'Sedans', 
      description: 'Elegant and comfortable sedans for daily commute', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'hatchback', 
      title: 'Hatchbacks', 
      description: 'Compact and efficient city cars', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'luxury', 
      title: 'Luxury', 
      description: 'Premium vehicles with advanced features', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'electric', 
      title: 'Electric', 
      description: 'Eco-friendly electric vehicles', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'sports', 
      title: 'Sports', 
      description: 'High-performance sports cars', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'convertible', 
      title: 'Convertibles', 
      description: 'Open-top driving experience', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'offroad', 
      title: 'Off-Road', 
      description: 'Rugged vehicles for adventurous terrains', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'vintage', 
      title: 'Vintage', 
      description: 'Classic and collector cars', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'hybrid', 
      title: 'Hybrid', 
      description: 'Fuel-efficient hybrid vehicles', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'minivan', 
      title: 'Minivans', 
      description: 'Family-friendly people carriers', 
      icon: <FaCar className="text-3xl" />
    },
    { 
      id: 'pickup', 
      title: 'Pickup Trucks', 
      description: 'Versatile trucks for work and play', 
      icon: <FaCar className="text-3xl" />
    }
  ];

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setFeaturedCars(mockFeaturedCars);
      setBudgetCars(mockBudgetCars);
      setCategories(updatedCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleToggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId) 
        : [...prev, carId]
    );
  };

  const CarCard = ({ car, isFavorite, onToggleFavorite }) => {
    return (
      <div className="car-card">
        <div className="image-container">
          <img src={car.image} alt={car.name} />
          <button 
            onClick={onToggleFavorite}
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        
        <div className="card-content">
          <h3 className="car-name">{car.name}</h3>
          <div className="price">₹{car.price.toLocaleString('en-IN')}</div>
          <div className="fuel-type">{car.fuelType}</div>
          
          <Link 
            to={`/cars/${car.id}`} 
            className="details-btn"
          >
            View Full Details <FaArrowRight className="arrow-icon" />
          </Link>
        </div>
      </div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Section component for consistent styling
  const Section = ({ title, subtitle, children, className = "", dark = false }) => (
    <Box className={`section ${dark ? 'section-dark' : 'section-light'} ${className}`}>
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h4" component="h2" className="section-title">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" className="section-subtitle">
              {subtitle}
            </Typography>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );

  // CarGrid component for reusable car listings
  const CarGrid = ({ cars, title, viewMoreLink }) => (
    <Box className="car-grid">
      <Box className="car-grid-header">
        <Typography variant="h5" className="car-grid-title">
          {title}
        </Typography>
        {viewMoreLink && (
          <Link to={viewMoreLink} className="view-all-link">
            View All
          </Link>
        )}
      </Box>
      <Grid container spacing={3}>
        {cars.map(car => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <CarCard 
              car={car} 
              onToggleFavorite={() => handleToggleFavorite(car.id)}
              isFavorite={favorites.includes(car.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <Hero />

      {/* Rest of your sections */}
      <div style={{ backgroundColor: '#111111' }}>
        {/* Featured Cars Section */}
        <Section title="Featured Cars" subtitle="Discover our handpicked selection of premium vehicles">
          <CarGrid 
            cars={featuredCars} 
            title="Featured Cars"
            viewMoreLink="/cars?featured=true"
          />
        </Section>

        {/* Budget Cars Section */}
        <Section title="Budget-Friendly Options" subtitle="Quality cars at affordable prices" dark>
          <CarGrid 
            cars={budgetCars} 
            title="Budget Cars"
            viewMoreLink="/cars?budget=true"
          />
        </Section>

        {/* Why Choose AutoVista Section */}
        <Section 
          title="Why Choose AutoVista" 
          subtitle="Experience the premium car buying journey with exceptional service and transparency"
          dark={true}
        >
          <Grid container spacing={4}>
            {whyChooseFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="feature-card"
                >
                  <Box className="feature-icon-container">
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className="feature-description">
                    {feature.description}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Categories Section */}
        <Section title="Browse by Category" subtitle="Find the perfect vehicle across our diverse range of categories">
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="category-card"
                >
                  <Link to={`/cars?category=${category.id}`}>
                    <div className="category-icon">{category.icon}</div>
                    <h3 className="category-title">{category.title}</h3>
                    <p className="category-description">{category.description}</p>
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Section>
      </div>
    </div>
  );
};

// Mock data
const mockFeaturedCars = [
  {
    id: 1,
    name: 'Maruti Swift',
    price: 699000,
    image: 'https://media.umbraco.io/suzuki-gb/vyuhzguv/10816_suzuki_swift_512_r1.jpg',
    fuelType: 'Petrol'
  },
  {
    id: 2,
    name: 'Maruti Baleno',
    price: 899000,
    image: 'https://imgd-ct.aeplcdn.com/1056x660/n/1ihrrua_1559469.jpg?q=80',
    fuelType: 'Petrol'
  },
  {
    id: 3,
    name: 'Maruti Suzuki Grand Vitara',
    price: 1142000,
    image: 'https://static.businessworld.in/WhatsApp%20Image%202024-10-08%20at%209.22.23%20PM_20241008212233_original_image_49.webp',
    fuelType: 'Petrol / Hybrid'
  },
  {
    id: 4,
    name: ' Maruti Suzuki Brezza',
    price: 869000,
    image: 'https://images8.alphacoders.com/125/thumb-1920-1251695.jpg',
    fuelType: 'Petrol / CNG'
  }
];

const mockBudgetCars = [
  {
    id: 5,
    name: 'Maruti Suzuki Ciaz',
    price: 941000,
    image: 'https://wallpapers.com/images/hd/suzuki-ciaz-6ibxcghybzvb363l.jpg',
    fuelType: 'Petrol'
  },
  {
    id: 6,
    name: 'Maruti Suzuki Dzire',
    price: 684000,
    image: 'https://www.v3cars.com/media/model-imgs/40109101-Dzire-front-quater-exterior.webp',
    fuelType: 'Petrol / CNG'
  },
  {
    id: 7,
    name: 'Hyundai i20',
    price: 947000,
    image: 'https://images5.alphacoders.com/115/thumb-1920-1156548.jpg',
    fuelType: 'Petrol'
  },
  {
    id: 8,
    name: 'Hyundai Grand i10 NIOS',
    price: 748000,
    image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg',
    fuelType: 'Petrol'
  }
];

export default Home;

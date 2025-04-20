import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Direct image URLs for the slideshow - using high-quality car images
  const slides = [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  ];

  // Preload images
  useEffect(() => {
    slides.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="hero-container">
      <section className="hero-section">
        {/* Slideshow Container */}
        <div className="hero-slideshow">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === activeIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide})`
              }}
            />
          ))}
          <div className="overlay" />
        </div>
        
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Find Your Perfect Car
          </h1>
          <p className="hero-subtitle">
            Discover, compare, and choose from thousands of cars with our comprehensive car database.
          </p>
          <div className="hero-buttons">
            <Link to="/cars" className="hero-button hero-button-primary">
              Browse Cars
            </Link>
            <Link to="/compare" className="hero-button hero-button-secondary">
              Compare Cars
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;

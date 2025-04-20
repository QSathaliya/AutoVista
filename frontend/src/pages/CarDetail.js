import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGasPump, FaCog, FaTachometerAlt, FaCalendarAlt,
  FaCarSide, FaShieldAlt, FaRuler, FaCogs,
  FaChair, FaPaintBrush, FaTools, FaCarCrash
} from 'react-icons/fa';
import './CarDetail.css';
import { mockCars } from './Cars'; // Import mockCars from Cars.js

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInCompare, setIsInCompare] = useState(false);

  useEffect(() => {
    // Fetch car data
    const fetchCarData = async () => {
      try {
        // Find the car from mockCars array
        const carData = mockCars.find(car => car.id === parseInt(id));
        if (carData) {
          // Enhance the car data with additional details
          const enhancedCarData = {
            ...carData,
            images: [carData.image], // Create images array from single image
            keyHighlights: [
              `${carData.make} ${carData.model} ${carData.year}`,
              `${carData.fuelType} Engine`,
              `${carData.transmission} Transmission`,
              `${carData.bodyType || 'Modern'} Design`,
              'Advanced Safety Features',
              'Premium Interior'
            ],
            specifications: {
              engine: {
                'Engine Type': carData.fuelType === 'Electric' ? 'Electric Motor' : `${carData.fuelType} Engine`,
                'Displacement': '1500 cc',
                'Max Power': '120 bhp',
                'Max Torque': '200 Nm',
                'Fuel System': carData.fuelType === 'Electric' ? 'Electric' : 'Direct Injection',
                'Emission Standard': 'BS6 Phase 2'
              },
              dimensions: {
                'Length': '4000 mm',
                'Width': '1800 mm',
                'Height': '1600 mm',
                'Wheelbase': '2600 mm',
                'Ground Clearance': '170 mm',
                'Boot Space': '350 litres',
                'Fuel Tank Capacity': carData.fuelType === 'Electric' ? '40 kWh Battery' : '45 litres',
                'Kerb Weight': '1200 kg'
              },
              transmission: {
                'Transmission Type': carData.transmission,
                'Drive Type': 'Front Wheel Drive',
                'Drive Modes': 'ECO, Normal, Sport',
                'Gear Box': carData.transmission === 'Manual' ? '6 Speed' : 'Automatic'
              }
            },
            features: {
              safety: [
                'Dual Front Airbags',
                'ABS with EBD',
                'Electronic Stability Control',
                'Hill Hold Control',
                'Reverse Parking Sensors',
                'ISOFIX Child Seat Mounts',
                'Impact Sensing Auto Door Unlock',
                'Speed Sensing Auto Door Lock',
                'Day/Night IRVM',
                'Central Locking'
              ],
              comfort: [
                'Automatic Climate Control',
                'Power Steering',
                'Power Windows',
                'Remote Keyless Entry',
                'Push Button Start/Stop',
                'Height Adjustable Driver Seat',
                'Front & Rear Armrest',
                'Adjustable Headrests',
                'Electric ORVMs',
                'Rear AC Vents'
              ],
              interior: [
                'Touchscreen Infotainment',
                'Android Auto & Apple CarPlay',
                'Bluetooth Connectivity',
                'USB Charging Ports',
                'Premium Fabric Upholstery',
                'Steering Mounted Controls',
                'Tilt Steering',
                'All Power Windows',
                'Digital Instrument Cluster',
                'Voice Commands'
              ],
              exterior: [
                'LED Headlamps',
                'LED DRLs',
                'LED Tail Lamps',
                'Alloy Wheels',
                'Roof Rails',
                'Front Fog Lamps',
                'Rear Defogger',
                'Rear Wiper & Washer',
                'Body Colored Bumpers',
                'Chrome Front Grille'
              ]
            }
          };
          setCar(enhancedCarData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car data:', error);
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  useEffect(() => {
    // Check if car is in compare list
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    setIsInCompare(compareList.some(item => item.id === parseInt(id)));
  }, [id]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleAddToCompare = () => {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (compareList.length >= 5) {
      alert('You can compare up to 5 cars at once');
      return;
    }
    
    if (!compareList.some(item => item.id === car.id)) {
      // Create a simplified car object with all needed specifications
      const carToCompare = {
        id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        image: car.images?.[0] || car.image,
        fuelType: car.fuelType,
        transmission: car.transmission,
        mileage: car.mileage,
        bodyType: car.bodyType,
        // Flatten essential specifications to make them easier to access
        engine_type: car.specifications?.engine?.['Engine Type'] || '-',
        displacement: car.specifications?.engine?.['Displacement'] || '-',
        length: car.specifications?.dimensions?.['Length'] || '-',
        width: car.specifications?.dimensions?.['Width'] || '-',
        height: car.specifications?.dimensions?.['Height'] || '-',
        wheelbase: car.specifications?.dimensions?.['Wheelbase'] || '-',
        // Include the full specifications for detailed comparison
        specifications: car.specifications,
        features: car.features
      };
      
      const updatedList = [...compareList, carToCompare];
      localStorage.setItem('compareList', JSON.stringify(updatedList));
      setIsInCompare(true);
      if (window.confirm('Car added to compare list. Would you like to go to the compare page?')) {
        navigate('/compare');
      }
    }
  };

  const handleRemoveFromCompare = () => {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    const updatedList = compareList.filter(item => item.id !== car.id);
    localStorage.setItem('compareList', JSON.stringify(updatedList));
    setIsInCompare(false);
  };

  if (loading) {
    return (
      <div className="car-detail-loading">
        <div>Loading...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="car-detail-error">
        <div>Car not found</div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content overview">
            <div className="car-description">
              <h3>Overview</h3>
              <p className="overview-text">{car.description || `Experience the perfect blend of style and performance with the ${car.year} ${car.make} ${car.model}. This ${car.bodyType.toLowerCase()} comes with a powerful ${car.fuelType.toLowerCase()} engine, ${car.transmission.toLowerCase()} transmission, and a host of modern features for your comfort and safety.`}</p>
            </div>
            <div className="key-highlights">
              <h3>Key Highlights</h3>
              <ul>
                {car.keyHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="tab-content specifications">
            <div className="spec-section">
              <h3>Engine & Performance</h3>
              <div className="spec-grid">
                {Object.entries(car.specifications.engine).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="spec-section">
              <h3>Dimensions & Capacity</h3>
              <div className="spec-grid">
                {Object.entries(car.specifications.dimensions).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="spec-section">
              <h3>Transmission & Drivetrain</h3>
              <div className="spec-grid">
                {Object.entries(car.specifications.transmission).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="tab-content features">
            <div className="feature-section">
              <h3>Safety Features</h3>
              <ul className="feature-list">
                {car.features.safety.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="feature-section">
              <h3>Comfort & Convenience</h3>
              <ul className="feature-list">
                {car.features.comfort.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="feature-section">
              <h3>Interior Features</h3>
              <ul className="feature-list">
                {car.features.interior.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="feature-section">
              <h3>Exterior Features</h3>
              <ul className="feature-list">
                {car.features.exterior.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="car-detail-page">
      <div className="car-detail-container">
        {/* Image Gallery */}
        <div className="car-gallery">
          <div className="main-image-container">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={car.images?.[selectedImage] || car.image}
              alt={`${car.make} ${car.model}`}
              className="car-main-image"
            />
          </div>
          <div className="thumbnail-container">
            {(car.images || [car.image]).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${car.make} ${car.model} view ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Car Information */}
        <div className="car-info-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="car-title">
              {car.year} {car.make} {car.model}
            </h1>
            <div className="car-price">₹{car.price.toLocaleString()}</div>

            {/* Key Features */}
            <div className="car-features">
              <div className="feature-item">
                <FaGasPump className="feature-icon" />
                <div className="feature-text">
                  <span className="feature-label">Fuel Type</span>
                  <span className="feature-value">{car.fuelType}</span>
                </div>
              </div>
              <div className="feature-item">
                <FaCog className="feature-icon" />
                <div className="feature-text">
                  <span className="feature-label">Transmission</span>
                  <span className="feature-value">{car.transmission}</span>
                </div>
              </div>
              <div className="feature-item">
                <FaTachometerAlt className="feature-icon" />
                <div className="feature-text">
                  <span className="feature-label">Mileage</span>
                  <span className="feature-value">{car.mileage} km</span>
                </div>
              </div>
              <div className="feature-item">
                <FaCalendarAlt className="feature-icon" />
                <div className="feature-text">
                  <span className="feature-label">Year</span>
                  <span className="feature-value">{car.year}</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="detail-tabs">
              <button
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
            </div>

            {/* Tab Content */}
            {renderTabContent()}

            {/* Actions */}
            <div className="car-actions">
              <button className="book-test-drive">Book Test Drive</button>
              <button className="contact-seller">Contact Seller</button>
              {isInCompare ? (
                <button className="remove-compare" onClick={handleRemoveFromCompare}>
                  Remove from Compare
                </button>
              ) : (
                <button className="add-compare" onClick={handleAddToCompare}>
                  Add to Compare
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail; 
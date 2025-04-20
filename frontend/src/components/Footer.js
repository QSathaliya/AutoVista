import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand-section">
          <Link to="/" className="footer-brand">
            <FaCar className="footer-logo-icon" />
            <span className="footer-logo-text">AutoVista</span>
          </Link>
          <p className="brand-description">
            Your trusted partner in finding the perfect car. Extensive selection, expert insights, and hassle-free experience.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cars">Browse Cars</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Car Categories</h3>
          <ul className="footer-links">
            <li><Link to="/cars?category=SUV">SUVs</Link></li>
            <li><Link to="/cars?category=Sedan">Sedans</Link></li>
            <li><Link to="/cars?category=Hatchback">Hatchbacks</Link></li>
            <li><Link to="/cars?category=Electric">Electric Cars</Link></li>
            <li><Link to="/cars?category=Luxury">Luxury Cars</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="contact-info">
            <p><FaPhone className="contact-icon" /> +91 9876543210</p>
            <p><FaEnvelope className="contact-icon" /> info@autovista.com</p>
            <p><FaMapMarkerAlt className="contact-icon" /> 123 Auto Avenue, Mumbai, India</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">&copy; {new Date().getFullYear()} AutoVista. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

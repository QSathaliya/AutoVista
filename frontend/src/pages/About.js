import React from 'react';
import { FaHandshake, FaAward, FaUsers, FaCarAlt, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';
import './About.css';

const About = () => (
  <div className="about-page-container">
    <div className="about-header">
      <h1>About <span className="highlight">AutoVista</span></h1>
      <p className="about-tagline">
        India's premier automotive marketplace, connecting car buyers with their dream vehicles since 2023.
      </p>
    </div>
    
    <div className="about-page">
      <div className="about-section">
        <h2><span className="icon-wrapper"><FaCarAlt /></span> Our Mission</h2>
        <p>
          At AutoVista, we're revolutionizing the car buying experience for India's diverse market. We believe everyone deserves access to transparent information, fair pricing, and a stress-free car buying journey.
        </p>
        <p>
          Our mission is to empower Indian car buyers with comprehensive information, honest reviews, and the best deals on new and used cars from trusted brands like Tata, Mahindra, Maruti Suzuki, Hyundai, and more.
        </p>
      </div>

      <div className="about-section">
        <h2><span className="icon-wrapper"><FaAward /></span> Why Choose AutoVista?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Comprehensive Database</h3>
            <p>Access detailed information on thousands of India-specific car models with real specifications and pricing.</p>
          </div>
          <div className="feature">
            <h3>Smart Comparison Tool</h3>
            <p>Compare up to 5 vehicles side-by-side with our intuitive comparison tool to make informed decisions.</p>
          </div>
          <div className="feature">
            <h3><FaMoneyBillWave /> EMI Calculator</h3>
            <p>Plan your finances with our advanced EMI calculator that shows you exactly what you'll pay.</p>
          </div>
          <div className="feature">
            <h3><FaShieldAlt /> Verified Reviews</h3>
            <p>Read authentic reviews from real Indian car owners who share their honest experiences.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2><span className="icon-wrapper"><FaUsers /></span> Our Team</h2>
        <p>
          We are a passionate team of automotive enthusiasts, tech experts, and customer experience specialists based across India. Our diverse team combines decades of industry experience with innovative technology to make car buying simpler and more transparent.
        </p>
        <p>
          Led by our founder Qusai Sathaliya, we're committed to revolutionizing how Indians buy and sell cars.
        </p>
        <div className="team-grid">
          <div className="team-member">
            <div className="team-photo" style={{ backgroundColor: '#E63946' }}>
              <span>QS</span>
            </div>
            <h4>Qusai Sathaliya</h4>
            <p className="team-role">Founder & CEO</p>
          </div>
          <div className="team-member">
            <div className="team-photo" style={{ backgroundColor: '#1D3557' }}>
              <span>AR</span>
            </div>
            <h4>Aditi Rao</h4>
            <p className="team-role">CTO</p>
          </div>
          <div className="team-member">
            <div className="team-photo" style={{ backgroundColor: '#457B9D' }}>
              <span>VP</span>
            </div>
            <h4>Vijay Patel</h4>
            <p className="team-role">Head of Operations</p>
          </div>
          <div className="team-member">
            <div className="team-photo" style={{ backgroundColor: '#F8C630' }}>
              <span>SK</span>
            </div>
            <h4>Sanya Khan</h4>
            <p className="team-role">Marketing Director</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2><span className="icon-wrapper"><FaHandshake /></span> Our Commitment</h2>
        <p>
          At AutoVista, we're committed to:
        </p>
        <ul className="commitment-list">
          <li>Providing accurate and up-to-date information on all vehicles</li>
          <li>Offering the best deals during seasonal sales and festivals</li>
          <li>Ensuring a seamless and secure car buying experience</li>
          <li>Supporting you throughout your car ownership journey</li>
          <li>Building long-term relationships with our customers</li>
        </ul>
        
        <div className="partner-brands">
          <h3>Our Trusted Brand Partners</h3>
          <p>We collaborate with India's most reputable automotive brands to bring you the best selection:</p>
          <div className="brand-logos">
            <div className="brand-logo">Maruti Suzuki</div>
            <div className="brand-logo">Hyundai</div>
            <div className="brand-logo">Tata Motors</div>
            <div className="brand-logo">Mahindra</div>
            <div className="brand-logo">Honda</div>
            <div className="brand-logo">Toyota</div>
            <div className="brand-logo">Kia</div>
            <div className="brand-logo">MG</div>
          </div>
        </div>
        
        <div className="stats-section">
          <h3>AutoVista in Numbers</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Covered Across India</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Cars Listed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Trusted Dealers</div>
            </div>
          </div>
        </div>
        
        <div className="timeline-section">
          <h3>Our Journey</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2018</div>
              <div className="timeline-content">
                <h4>Foundation</h4>
                <p>AutoVista was founded in Mumbai with a vision to transform car buying in India</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2019</div>
              <div className="timeline-content">
                <h4>Expansion</h4>
                <p>Expanded operations to Delhi, Bangalore, and Hyderabad</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2020</div>
              <div className="timeline-content">
                <h4>Digital Transformation</h4>
                <p>Launched our mobile app and enhanced online buying experience</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2022</div>
              <div className="timeline-content">
                <h4>Award-Winning Service</h4>
                <p>Recognized as "Best Car Marketplace" by Auto India Magazine</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <h4>Nationwide Presence</h4>
                <p>Now serving customers across 50+ cities in India with 200+ dealer partners</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="festival-offers">
          <h3>Festival Season Specials <span className="festival-tag">Limited Time</span></h3>
          <p>Celebrate the festive season with special offers on your dream car! From Diwali discounts to Navratri specials, we have exclusive deals waiting for you.</p>
          <ul className="festival-list">
            <li><span className="festival-highlight">Diwali Bonanza:</span> Special financing rates and free accessories</li>
            <li><span className="festival-highlight">Durga Puja Special:</span> Extended warranty packages on all cars</li>
            <li><span className="festival-highlight">Year-End Sale:</span> Up to ₹1 Lakh off on select models</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default About;

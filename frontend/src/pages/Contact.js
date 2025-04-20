import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset form after submission
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Our team is always here to help!</p>
      </div>

      <div className="contact-page">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Have questions about our services or need assistance with your car buying journey? Reach out to our team of automotive experts.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h3>Call Us</h3>
                  <p>+91-98765-43210</p>
                  <p>+91-98765-43211</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h3>Email Us</h3>
                  <p>support@autovista.in</p>
                  <p>sales@autovista.in</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h3>Visit Us</h3>
                  <p>AutoVista Headquarters</p>
                  <p>123 Tech Park, Andheri East</p>
                  <p>Mumbai, Maharashtra 400069</p>
                </div>
              </div>
            </div>
            
            <div className="contact-social">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><FaFacebook /></a>
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
                <a href="#" className="social-icon"><FaWhatsapp /></a>
              </div>
            </div>

            <div className="business-hours">
              <h3>Business Hours</h3>
              <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
              <p>Sunday: 11:00 AM - 5:00 PM</p>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <h2>Send Us a Message</h2>
            {submitted ? (
              <div className="contact-success">
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="send-another-btn">Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your full name" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="Enter your email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Enter your phone number" 
                      value={form.phone} 
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="What is this regarding?" 
                    value={form.subject} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us how we can help you..." 
                    value={form.message} 
                    onChange={handleChange} 
                    required 
                    rows="5"
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us on the Map</h2>
        <div className="map-placeholder">
          <FaMapMarkerAlt className="map-marker" />
          <p>AutoVista Headquarters, Mumbai</p>
          <span className="map-note">(Interactive map would be displayed here)</span>
        </div>
      </div>
      
      <div className="branches-section">
        <h2>Our Branches Across India</h2>
        <div className="branches-grid">
          <div className="branch-card">
            <h3>Mumbai (HQ)</h3>
            <p>123 Tech Park, Andheri East</p>
            <p>Mumbai, Maharashtra 400069</p>
            <p><strong>Phone:</strong> +91-98765-43210</p>
          </div>
          
          <div className="branch-card">
            <h3>Delhi NCR</h3>
            <p>456 Business Hub, Sector 62</p>
            <p>Noida, Uttar Pradesh 201301</p>
            <p><strong>Phone:</strong> +91-98765-43211</p>
          </div>
          
          <div className="branch-card">
            <h3>Bangalore</h3>
            <p>789 Tech Avenue, Whitefield</p>
            <p>Bangalore, Karnataka 560066</p>
            <p><strong>Phone:</strong> +91-98765-43212</p>
          </div>
          
          <div className="branch-card">
            <h3>Hyderabad</h3>
            <p>321 Cyber Towers, Hitech City</p>
            <p>Hyderabad, Telangana 500081</p>
            <p><strong>Phone:</strong> +91-98765-43213</p>
          </div>
          
          <div className="branch-card">
            <h3>Chennai</h3>
            <p>654 Marina Business Park</p>
            <p>Chennai, Tamil Nadu 600028</p>
            <p><strong>Phone:</strong> +91-98765-43214</p>
          </div>
          
          <div className="branch-card">
            <h3>Kolkata</h3>
            <p>987 Salt Lake, Sector V</p>
            <p>Kolkata, West Bengal 700091</p>
            <p><strong>Phone:</strong> +91-98765-43215</p>
          </div>
        </div>
      </div>
      
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>How can I test drive a car?</h3>
            <p>You can schedule a test drive through our website or by calling our customer service. Our representative will arrange a convenient time for you to visit our showroom or bring the car to your location.</p>
          </div>
          
          <div className="faq-item">
            <h3>What documents do I need to buy a car?</h3>
            <p>You'll need your ID proof (Aadhar Card/PAN Card/Passport), address proof, income proof, and passport-sized photographs. For financing, additional documents may be required by the lending institution.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you offer after-sales service?</h3>
            <p>Yes, we have tie-ups with authorized service centers across India. We offer comprehensive service packages and extended warranties to ensure your car remains in top condition.</p>
          </div>
          
          <div className="faq-item">
            <h3>How does the car comparison feature work?</h3>
            <p>Our car comparison tool allows you to select up to 5 cars and compare them side by side on various parameters like price, features, specifications, mileage, and more to help you make an informed decision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

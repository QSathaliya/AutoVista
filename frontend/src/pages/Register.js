import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserAlt, FaEnvelope, FaLock, FaLockOpen } from 'react-icons/fa';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simple validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    // Check if a user with this email already exists
    const usersString = localStorage.getItem('autovista_users');
    const users = usersString ? JSON.parse(usersString) : [];
    const existingUser = users.find(user => user.email === formData.email);
    
    if (existingUser) {
      setError('A user with this email already exists. Please use a different email or login.');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Registering new user:', {
        username: formData.username,
        email: formData.email
      });
      
      // Create new user
      const newUser = {
        id: 'user_' + Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password, // In a real app, this should be hashed
        role: formData.email === 'qusaisathaliya12345@gmail.com' ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      };
      
      // Add to users list
      users.push(newUser);
      localStorage.setItem('autovista_users', JSON.stringify(users));
      
      console.log('User registered successfully:', newUser);
      
      // Show success message
      alert('Registration successful! Please login with your new account.');
      
      // Redirect to login page
      navigate('/login');
      
      setLoading(false);
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to register. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="register-form-container"
        >
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join AutoVista to find your perfect car</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="username">
                <FaUserAlt className="input-icon" /> Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FaLockOpen className="input-icon" /> Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="register-button"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
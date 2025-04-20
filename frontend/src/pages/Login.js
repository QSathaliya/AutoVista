import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle } from '../firebase';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Attempting login with:', { email: formData.email });
      
      // Get users from localStorage
      const usersString = localStorage.getItem('autovista_users');
      const users = usersString ? JSON.parse(usersString) : [];
      
      // Find user by email
      const user = users.find(u => u.email === formData.email);
      
      // Check if user exists and password matches
      if (!user || user.password !== formData.password) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }
      
      console.log('Login successful, user data:', user);
      
      // Generate a token
      const token = 'token_' + Date.now();
      localStorage.setItem('autovista_token', token);
      
      // Prepare user data for session
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        isLoggedIn: true,
        role: user.email === 'qusaisathaliya12345@gmail.com' ? 'admin' : (user.role || 'user')
      };
      
      console.log('Storing user data:', userData);
      localStorage.setItem('autovista_current_user', JSON.stringify(userData));
      
      // Dispatch event to update navbar
      window.dispatchEvent(new Event('userAuthUpdate'));
      
      // For admin users, ensure they can access admin page
      if (userData.role === 'admin') {
        alert('Welcome back, Admin! You can access the admin dashboard from the navbar.');
      } else {
        alert('Login successful! Welcome back, ' + userData.username + '!');
      }
      
      // Navigate to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      // After Google sign-in, check with the backend if this user exists
      // If they exist, get their role, otherwise register them as a new user
      try {
        // Try to log in with Google credentials
        const response = await fetch('http://localhost:5000/api/auth/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            googleId: user.uid,
            displayName: user.displayName
          }),
        });

        const data = await response.json();
        if (data.token) {
          localStorage.setItem('autovista_token', data.token);
          localStorage.setItem('autovista_current_user', JSON.stringify({
            id: data.user.id,
            username: data.user.username || user.displayName,
            email: data.user.email,
            isLoggedIn: true,
            photoURL: user.photoURL,
            role: data.user.role // Get role from the backend
          }));
          navigate('/');
        } else {
          throw new Error('Google authentication failed');
        }
      } catch (apiError) {
        console.error('Google sign-in API error:', apiError);
        // Fallback to client-side authentication if the server-side fails
        localStorage.setItem('autovista_current_user', JSON.stringify({
          id: user.uid,
          username: user.displayName,
          email: user.email,
          isLoggedIn: true,
          photoURL: user.photoURL,
          role: 'user' // Default to user role for client-side fallback
        }));
        navigate('/');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="login-form-container"
        >
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue to AutoVista</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <FaUserAlt className="input-icon" /> Email Address
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
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="social-auth-separator">
            <span>OR</span>
          </div>

          <button 
            className="google-signin-button"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="google-icon" />
            Continue with Google
          </button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
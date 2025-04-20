import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCar, FaBars } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('autovista_current_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log('Navbar: loaded user data:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        setUser(null);
      }
    };

    // Initialize on component mount
    handleStorageChange();
    
    // Listen for storage changes (for when user logs in/out in another tab)
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab login/logout updates
    window.addEventListener('userAuthUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userAuthUpdate', handleStorageChange);
    };
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <FaCar /> AutoVista
          </div>
        </Link>

        <div className="navbar-center">
          <Link 
            to="/cars" 
            className={`nav-link ${isActive('/cars') ? 'active' : ''}`}
          >
            Browse Cars
          </Link>
          <Link 
            to="/compare" 
            className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
          >
            Compare
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {user ? (
            <div className="user-actions">
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-button">
                  Admin Dashboard
                </Link>
              )}
              <div className="user-profile">
                <span className="username">{user.username}</span>
                <button 
                  className="logout-button"
                  onClick={() => {
                    console.log('Logging out user...');
                    localStorage.removeItem('autovista_token');
                    localStorage.removeItem('autovista_current_user');
                    setUser(null);
                    // Dispatch custom event to notify components of auth change
                    window.dispatchEvent(new Event('userAuthUpdate'));
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="sign-in-button">
                Sign In
              </Link>
              <Link to="/register" className="get-started-button">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link 
          to="/cars" 
          className={`mobile-nav-link ${isActive('/cars') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Browse Cars
        </Link>
        <Link 
          to="/compare" 
          className={`mobile-nav-link ${isActive('/compare') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Compare
        </Link>
        <Link 
          to="/about" 
          className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </Link>

        {user ? (
          <>
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`mobile-nav-link ${isActive('/admin') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            <button 
              className="mobile-nav-link mobile-logout"
              onClick={() => {
                console.log('Logging out user from mobile menu...');
                localStorage.removeItem('autovista_token');
                localStorage.removeItem('autovista_current_user');
                setUser(null);
                setIsMobileMenuOpen(false);
                // Dispatch custom event to notify components of auth change
                window.dispatchEvent(new Event('userAuthUpdate'));
                window.location.href = '/';
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar; 
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCar,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import CarList from '../components/admin/CarList';
import CarForm from '../components/admin/CarForm';
import UserLoginReport from '../components/admin/UserLoginReport';
import './Admin.css';

const Admin = () => {
  const location = useLocation();
  const [stats, setStats] = useState({
    totalCars: 0,
    totalUsers: 0,
    totalBrands: 0,
    averagePrice: 0
  });

  // Dummy stats for now
  useEffect(() => {
    setStats({
      totalCars: 42,
      totalUsers: 128,
      totalBrands: 15,
      averagePrice: 2500000 // Changed to rupees
    });
  }, []);

  const Dashboard = () => (
    <div className="dashboard-content">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon car-icon">
            <FaCar />
          </div>
          <div className="stat-info">
            <h3>{stats.totalCars}</h3>
            <p>Total Cars</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon users-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon brands-icon">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>{stats.totalBrands}</h3>
            <p>Total Brands</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon price-icon">
            <FaTachometerAlt />
          </div>
          <div className="stat-info">
            <h3>₹{stats.averagePrice.toLocaleString()}</h3>
            <p>Average Price</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={location.pathname === '/admin' || location.pathname === '/admin/dashboard' ? 'active' : ''}>
              <Link to="/admin/dashboard">
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={location.pathname.includes('/admin/cars') ? 'active' : ''}>
              <Link to="/admin/cars">
                <FaCar />
                <span>Cars Management</span>
              </Link>
            </li>
            <li className={location.pathname === '/admin/reports/user-logins' ? 'active' : ''}>
              <Link to="/admin/reports/user-logins">
                <FaUsers />
                <span>User Logins</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/new" element={<CarForm />} />
          <Route path="/cars/edit/:id" element={<CarForm />} />
          <Route path="/reports/user-logins" element={<UserLoginReport />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;

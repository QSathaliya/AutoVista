# AutoVista - Car Marketplace

A modern car marketplace platform built with the MERN stack, offering a comprehensive solution for exploring, comparing, and managing car listings.

## Features

- 🚗 Extensive car catalog with detailed information
- 🔍 Advanced search and filtering options
- ⚡ Category-based browsing (EVs, Petrol, Diesel)
- 🔄 Car comparison tool (up to 5 cars)
- ❤️ Favorites management
- 👤 User authentication system
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: React.js with modern UI libraries
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

## Project Structure

```
autovista/
├── frontend/           # React frontend application
├── backend/           # Node.js & Express backend
└── README.md         # Project documentation
```

## Author

Qusai Sathaliya - Senior MERN Stack Developer

## Testing the New Admin Dashboard Features

### Prerequisites
1. Ensure you have Node.js and MongoDB installed
2. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
4. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

### Testing Car Management Features

1. **Accessing the Admin Dashboard**
   - Log in with admin credentials
   - Navigate to the admin dashboard at `/admin`
   - Click on "Cars Management" in the sidebar

2. **Viewing Cars List**
   - The cars list should display all cars in a paginated table
   - Test the search functionality by entering car names, makes, or models
   - Verify that pagination works correctly

3. **Adding a New Car**
   - Click the "Add New Car" button
   - Fill out the car form with required information
   - Submit the form and verify the car appears in the list
   - Test validation by submitting incomplete forms

4. **Editing a Car**
   - Click the edit icon on any car
   - Modify car details
   - Save changes and verify updates in the list

5. **Deleting a Car**
   - Click the delete icon on any car
   - Confirm deletion
   - Verify the car is removed from the list

### Testing User Login Report

1. **Accessing the Report**
   - Navigate to the admin dashboard
   - Click on "User Logins" under the Reports section
   - Verify the table displays user login data

2. **Testing Refresh Functionality**
   - Click the refresh button
   - Verify the data updates (currently static data)

### Troubleshooting

If you encounter any issues:

1. **Backend Issues**
   - Check MongoDB connection
   - Verify API endpoints are accessible
   - Check server logs for errors

2. **Frontend Issues**
   - Clear browser cache
   - Check console for errors
   - Verify all dependencies are installed

3. **Authentication Issues**
   - Ensure you're logged in as an admin
   - Check token validity
   - Verify admin role permissions

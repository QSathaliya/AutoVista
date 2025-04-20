const Car = require('../models/Car');
const { validationResult } = require('express-validator');

// @desc    Get all cars with pagination and search
// @route   GET /api/admin/cars
// @access  Private/Admin
exports.getCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchTerm = req.query.search || '';
    
    // Build search query
    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { make: { $regex: searchTerm, $options: 'i' } },
          { model: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } }
        ]
      };
    }

    const cars = await Car.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('seller', 'name email');

    const total = await Car.countDocuments(query);

    res.json({
      success: true,
      data: cars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cars',
      error: error.message
    });
  }
};

// @desc    Get single car by ID
// @route   GET /api/admin/cars/:id
// @access  Private/Admin
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'name email');

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching car',
      error: error.message
    });
  }
};

// @desc    Create new car
// @route   POST /api/admin/cars
// @access  Private/Admin
exports.createCar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Validate images array
    if (!req.body.images || !Array.isArray(req.body.images) || req.body.images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image URL is required'
      });
    }

    // Create new car with current timestamp
    const car = new Car({
      ...req.body,
      seller: req.user.id,
      lastUpdated: Date.now()
    });

    await car.save();

    res.status(201).json({
      success: true,
      data: car,
      message: 'Car created successfully'
    });
  } catch (error) {
    console.error('Error creating car:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating car',
      error: error.message
    });
  }
};

// @desc    Update car
// @route   PUT /api/admin/cars/:id
// @access  Private/Admin
exports.updateCar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Check if car exists
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Validate images array if provided
    if (req.body.images && (!Array.isArray(req.body.images) || req.body.images.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'At least one image URL is required'
      });
    }

    // Update car fields
    Object.keys(req.body).forEach(key => {
      car[key] = req.body[key];
    });

    car.lastUpdated = Date.now();
    await car.save();

    res.json({
      success: true,
      data: car,
      message: 'Car updated successfully'
    });
  } catch (error) {
    console.error('Error updating car:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    // Handle cast error (invalid ID)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid car ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating car',
      error: error.message
    });
  }
};

// @desc    Delete car
// @route   DELETE /api/admin/cars/:id
// @access  Private/Admin
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Use deleteOne instead of remove (which is deprecated)
    await Car.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    
    // Handle cast error (invalid ID)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid car ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while deleting car',
      error: error.message
    });
  }
};
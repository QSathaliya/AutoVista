const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Make is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
    required: [true, 'Fuel type is required']
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic', 'Semi-Automatic'],
    required: [true, 'Transmission type is required']
  },
  mileage: {
    type: Number,
    required: [true, 'Mileage is required'],
    min: [0, 'Mileage cannot be negative']
  },
  color: {
    type: String,
    required: [true, 'Color is required']
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  features: [{
    type: String
  }],
  specifications: {
    engine: {
      type: String,
      required: [true, 'Engine specification is required']
    },
    power: {
      type: String,
      required: [true, 'Power specification is required']
    },
    torque: {
      type: String,
      required: [true, 'Torque specification is required']
    },
    acceleration: String,
    topSpeed: String,
    fuelEfficiency: String
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  condition: {
    type: String,
    enum: ['New', 'Used', 'Certified Pre-Owned'],
    required: [true, 'Condition is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller information is required']
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Reserved', 'Pending'],
    default: 'Available'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add text index for search functionality
carSchema.index({
  make: 'text',
  model: 'text',
  description: 'text'
});

// Add compound index for efficient queries
carSchema.index({ make: 1, model: 1, year: 1 });

const Car = mongoose.model('Car', carSchema);
module.exports = Car;

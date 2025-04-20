const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect, admin } = require('../../middleware/auth');
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} = require('../../controllers/adminCarController');

// Validation middleware
const carValidation = [
  check('make', 'Make is required').not().isEmpty(),
  check('model', 'Model is required').not().isEmpty(),
  check('year', 'Year is required').isInt({ min: 1900, max: new Date().getFullYear() + 1 }),
  check('price', 'Price is required').isFloat({ min: 0 }),
  check('mileage', 'Mileage is required').isFloat({ min: 0 }),
  check('fuelType', 'Valid fuel type is required').isIn(['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']),
  check('transmission', 'Valid transmission type is required').isIn(['Manual', 'Automatic', 'Semi-Automatic']),
  check('images', 'At least one image is required').isArray({ min: 1 }),
  check('condition', 'Valid condition is required').isIn(['New', 'Used', 'Certified Pre-Owned']),
  check('status', 'Valid status is required').isIn(['Available', 'Sold', 'Reserved', 'Pending'])
];

// Apply auth middleware to all routes
router.use(protect);
router.use(admin);

// Routes
router.route('/')
  .get(getCars)
  .post(carValidation, createCar);

router.route('/:id')
  .get(getCarById)
  .put(carValidation, updateCar)
  .delete(deleteCar);

module.exports = router; 
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', carController.getCars);
router.get('/search', carController.searchCars);
router.get('/recent', carController.getRecentCars);
router.get('/fuel-type/:fuelType', carController.getCarsByFuelType);
router.get('/:id', carController.getCarById);

// Protected routes
router.post('/', auth, carController.createCar);
router.put('/:id', auth, carController.updateCar);
router.delete('/:id', auth, carController.deleteCar);

module.exports = router;

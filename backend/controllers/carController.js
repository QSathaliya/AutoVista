const Car = require('../models/Car');

// Get all cars with filtering
exports.getCars = async (req, res) => {
  try {
    const {
      make,
      model,
      fuelType,
      minPrice,
      maxPrice,
      year,
      condition,
      sort = '-createdAt'
    } = req.query;

    const query = {};

    if (make) query.make = new RegExp(make, 'i');
    if (model) query.model = new RegExp(model, 'i');
    if (fuelType) query.fuelType = fuelType;
    if (condition) query.condition = condition;
    if (year) query.year = year;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const cars = await Car.find(query)
      .sort(sort)
      .populate('seller', 'username email');

    res.json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('seller', 'username email');
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create new car listing
exports.createCar = async (req, res) => {
  try {
    const car = new Car({
      ...req.body,
      seller: req.user._id
    });

    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update car listing
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete car listing
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await car.remove();
    res.json({ message: 'Car listing removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search cars
exports.searchCars = async (req, res) => {
  try {
    const { q } = req.query;
    
    const cars = await Car.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('seller', 'username email');

    res.json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get recent cars
exports.getRecentCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .sort('-createdAt')
      .limit(6)
      .populate('seller', 'username email');

    res.json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get cars by fuel type
exports.getCarsByFuelType = async (req, res) => {
  try {
    const { fuelType } = req.params;
    
    const cars = await Car.find({ fuelType })
      .sort('-createdAt')
      .limit(6)
      .populate('seller', 'username email');

    res.json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

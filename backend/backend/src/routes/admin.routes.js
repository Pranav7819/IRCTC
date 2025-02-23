const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.middleware');
const Booking = require('../models/booking.model');
const Train = require('../models/train.model');
const { addTrain } = require('../data/mockData');

// Get dashboard statistics
router.get('/statistics', adminAuth, async (req, res) => {
  try {
    console.log('Fetching dashboard statistics...');
    const totalBookings = await Booking.countDocuments();
    const activeTrains = await Train.countDocuments({ status: 'Active' });
    const cancelledBookings = await Booking.countDocuments({ status: 'Cancelled' });
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'Confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const statistics = {
      totalBookings,
      activeTrains,
      cancelledBookings,
      totalRevenue: totalRevenue[0]?.total || 0
    };
    
    console.log('Statistics fetched successfully:', statistics);
    res.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// Create a new train
router.post('/trains', adminAuth, async (req, res) => {
  try {
    console.log('Creating new train with data:', req.body);
    const {
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      classes,
      daysOfOperation
    } = req.body;

    // Calculate duration in minutes
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const duration = Math.round((arrival - departure) / (1000 * 60));

    const train = new Train({
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      duration,
      classes,
      daysOfOperation,
      status: 'Active'
    });

    // Validate train data
    const validationError = train.validateSync();
    if (validationError) {
      console.error('Train validation failed:', validationError);
      return res.status(400).json({ 
        message: 'Invalid train data', 
        errors: validationError.errors 
      });
    }

    await train.save();
    console.log('Train created successfully:', train);
    
    // Update mock data
    addTrain(train);
    res.status(201).json(train);
  } catch (error) {
    console.error('Error creating train:', error);
    res.status(500).json({ 
      message: 'Error creating train', 
      error: error.message,
      details: error.stack 
    });
  }
});

// Get all trains for admin
router.get('/trains', adminAuth, async (req, res) => {
  try {
    console.log('Fetching all trains...');
    const trains = await Train.find().sort({ trainNumber: 1 });
    console.log(`Found ${trains.length} trains`);
    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ message: 'Error fetching trains', error: error.message });
  }
});

// Get train by ID
router.get('/trains/:id', adminAuth, async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching train', error: error.message });
  }
});

// Update train
router.put('/trains/:id', adminAuth, async (req, res) => {
  try {
    const {
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      classes,
      daysOfOperation,
      status
    } = req.body;

    // Calculate duration in minutes
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const duration = Math.round((arrival - departure) / (1000 * 60));

    const train = await Train.findByIdAndUpdate(
      req.params.id,
      {
        trainNumber,
        trainName,
        source,
        destination,
        departureTime,
        arrivalTime,
        duration,
        classes,
        daysOfOperation,
        status
      },
      { new: true }
    );

    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error updating train', error: error.message });
  }
});

// Delete train
router.delete('/trains/:id', adminAuth, async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    // Check if there are any active bookings for this train
    const activeBookings = await Booking.countDocuments({
      train: req.params.id,
      status: 'Confirmed'
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        message: 'Cannot delete train with active bookings. Please cancel or complete all bookings first.'
      });
    }

    await train.remove();
    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting train', error: error.message });
  }
});

// Update train status
router.patch('/trains/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Cancelled', 'Delayed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const train = await Train.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error updating train status', error: error.message });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Train = require('../models/train.model');
const { auth, adminAuth } = require('../middleware/auth.middleware');
const trainController = require('../controllers/trainController');

// Validation middleware for train creation/update
const trainValidation = [
  body('trainNumber').trim().notEmpty(),
  body('trainName').trim().notEmpty(),
  body('source').trim().notEmpty(),
  body('destination').trim().notEmpty(),
  body('departureTime').isISO8601(),
  body('arrivalTime').isISO8601(),
  body('classes').isArray(),
  body('daysOfOperation').isArray()
];

// Create new train (Admin only)
router.post('/', adminAuth, trainValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const train = new Train(req.body);
    await train.save();

    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error creating train', error: error.message });
  }
});

// Get all trains
router.get('/', trainController.getAllTrains);

// Search trains
router.get('/search', trainController.searchTrains);

// Get train by ID
router.get('/:id', trainController.getTrainById);

// Update train (Admin only)
router.put('/:id', adminAuth, trainValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const train = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
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

// Delete train (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting train', error: error.message });
  }
});

// Update train status (Admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
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
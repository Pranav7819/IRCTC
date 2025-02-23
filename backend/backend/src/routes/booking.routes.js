const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth.middleware');
const bookingController = require('../controllers/bookingController');

// Validation middleware for booking creation
const bookingValidation = [
  body('train').notEmpty(),
  body('travelDate').isISO8601(),
  body('passengers').isArray(),
  body('passengers.*.firstName').trim().notEmpty(),
  body('passengers.*.lastName').trim().notEmpty(),
  body('passengers.*.age').isInt({ min: 1, max: 120 }),
  body('passengers.*.gender').isIn(['Male', 'Female', 'Other']),
  body('classType').isIn(['1A', '2A', '3A', 'SL', 'CC'])
];

// Create new booking
router.post('/', auth, bookingValidation, bookingController.createBooking);

// Get user's bookings
router.get('/my-bookings', auth, bookingController.getMyBookings);

// Get booking by PNR
router.get('/pnr/:pnrNumber', auth, bookingController.getBookingByPNR);

// Cancel booking
router.post('/:id/cancel', auth, bookingController.cancelBooking);

module.exports = router; 
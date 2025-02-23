const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  seatNumber: String,
  discountType: {
    type: String,
    enum: ['Senior Citizen', 'Child', 'Military', 'None'],
    default: 'None'
  }
});

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  travelDate: {
    type: Date,
    required: true
  },
  passengers: [passengerSchema],
  classType: {
    type: String,
    enum: ['1A', '2A', '3A', 'SL', 'CC'],
    required: true
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled', 'Waiting'],
    default: 'Confirmed'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  pnrNumber: {
    type: String,
    required: true,
    unique: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  cancellationReason: String,
  cancellationDate: Date,
  refundAmount: Number
}, {
  timestamps: true
});

// Generate PNR before saving
bookingSchema.pre('save', async function(next) {
  if (!this.pnrNumber) {
    // Generate a 10-digit PNR number
    this.pnrNumber = 'PNR' + Date.now().toString().slice(-10);
  }
  next();
});

// Index for faster booking lookups
bookingSchema.index({ pnrNumber: 1, user: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 
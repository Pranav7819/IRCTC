const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: [true, 'Train number is required'],
    unique: true,
    trim: true
  },
  trainName: {
    type: String,
    required: [true, 'Train name is required'],
    trim: true
  },
  source: {
    type: String,
    required: [true, 'Source station is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination station is required'],
    trim: true
  },
  departureTime: {
    type: Date,
    required: [true, 'Departure time is required']
  },
  arrivalTime: {
    type: Date,
    required: [true, 'Arrival time is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required']
  },
  classes: [{
    type: {
      type: String,
      required: [true, 'Class type is required'],
      enum: ['1A', '2A', '3A', 'SL', 'CC', 'EC']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    totalSeats: {
      type: Number,
      required: [true, 'Total seats is required'],
      min: [1, 'Total seats must be at least 1']
    },
    availableSeats: {
      type: Number,
      required: [true, 'Available seats is required'],
      min: [0, 'Available seats cannot be negative']
    }
  }],
  daysOfOperation: {
    type: [String],
    required: [true, 'Days of operation are required'],
    validate: {
      validator: function(days) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.every(day => validDays.includes(day));
      },
      message: 'Invalid day of operation'
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Cancelled', 'Delayed'],
    default: 'Active'
  },
  intermediateStops: [{
    station: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: Date,
      required: true
    },
    departureTime: {
      type: Date,
      required: true
    },
    distance: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Add validation for arrival time being after departure time
trainSchema.pre('save', function(next) {
  if (this.arrivalTime <= this.departureTime) {
    next(new Error('Arrival time must be after departure time'));
  }
  next();
});

// Index for searching trains
trainSchema.index({ source: 1, destination: 1, departureTime: 1 });

const Train = mongoose.model('Train', trainSchema);

module.exports = Train; 
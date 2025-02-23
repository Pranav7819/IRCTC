const { mockTrains } = require('../data/mockData');

// Store bookings in memory for demo purposes
const bookings = [];
let bookingIdCounter = 1;

exports.createBooking = (req, res) => {
  try {
    const { train: trainId, travelDate, passengers, classType } = req.body;
    const userId = req.user._id; // Assuming auth middleware sets this

    console.log('Creating booking:', { trainId, travelDate, classType, passengerCount: passengers.length });

    // Log incoming request data
    console.log('Incoming booking data:', req.body);

    // Find train
    const train = mockTrains.find(t => t._id === trainId);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    // Check if train operates on the selected date
    const dayOfWeek = new Date(travelDate).toLocaleString('en-us', { weekday: 'long' });
    if (!train.daysOfOperation.includes(dayOfWeek)) {
      return res.status(400).json({ message: 'Train does not operate on this date' });
    }

    // Find selected class and check seat availability
    const selectedClass = train.classes.find(c => c.type === classType);
    if (!selectedClass) {
      return res.status(400).json({ message: 'Invalid class type' });
    }

    if (selectedClass.availableSeats < passengers.length) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Calculate total amount
    let totalAmount = 0;
    passengers.forEach(passenger => {
      let price = selectedClass.price;
      if (passenger.age >= 60) {
        price *= 0.6; // 40% discount for senior citizens
      } else if (passenger.age <= 12) {
        price *= 0.5; // 50% discount for children
      }
      totalAmount += price;
    });

    // Create booking
    const booking = {
      _id: `booking${bookingIdCounter++}`,
      user: userId,
      train: trainId,
      trainDetails: {
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        source: train.source,
        destination: train.destination,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime
      },
      travelDate,
      passengers,
      classType,
      totalAmount,
      status: 'Confirmed',
      pnrNumber: `PNR${Date.now()}`,
      bookingDate: new Date()
    };

    // Update available seats
    selectedClass.availableSeats -= passengers.length;

    // Save booking
    bookings.push(booking);

    console.log('Booking created successfully:', booking.pnrNumber);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

exports.getMyBookings = (req, res) => {
  try {
    const userId = req.user._id;
    const userBookings = bookings.filter(booking => booking.user === userId);
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

exports.getBookingByPNR = (req, res) => {
  try {
    const { pnrNumber } = req.params;
    const booking = bookings.find(b => b.pnrNumber === pnrNumber);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user !== req.user._id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

exports.cancelBooking = (req, res) => {
  try {
    const { id } = req.params;
    const bookingIndex = bookings.findIndex(b => b._id === id);

    if (bookingIndex === -1) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = bookings[bookingIndex];

    if (booking.user !== req.user._id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.status === 'Cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Calculate refund
    const travelDate = new Date(booking.travelDate);
    const now = new Date();
    const hoursDifference = (travelDate - now) / (1000 * 60 * 60);

    let refundPercentage;
    if (hoursDifference >= 48) {
      refundPercentage = 0.75;
    } else if (hoursDifference >= 24) {
      refundPercentage = 0.50;
    } else if (hoursDifference >= 12) {
      refundPercentage = 0.25;
    } else {
      refundPercentage = 0;
    }

    const refundAmount = booking.totalAmount * refundPercentage;

    // Update booking
    booking.status = 'Cancelled';
    booking.cancellationDate = new Date();
    booking.cancellationReason = req.body.reason || 'Cancelled by user';
    booking.refundAmount = refundAmount;

    // Update train seats
    const train = mockTrains.find(t => t._id === booking.train);
    if (train) {
      const selectedClass = train.classes.find(c => c.type === booking.classType);
      if (selectedClass) {
        selectedClass.availableSeats += booking.passengers.length;
      }
    }

    res.json({
      message: 'Booking cancelled successfully',
      refundAmount,
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
}; 
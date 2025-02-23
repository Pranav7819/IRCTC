const { mockTrains } = require('../data/mockData');

// Get all trains (using mock data)
exports.getAllTrains = (req, res) => {
  try {
    console.log('Fetching all trains:', mockTrains.length);
    res.json(mockTrains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ message: 'Error fetching trains', error: error.message });
  }
};

// Get train by ID (using mock data)
exports.getTrainById = (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching train by ID:', id);
    
    const train = mockTrains.find(train => train._id === id);
    console.log('Found train:', train ? train.trainName : 'Not found');

    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.json(train);
  } catch (error) {
    console.error('Error fetching train by ID:', error);
    res.status(500).json({ message: 'Error fetching train', error: error.message });
  }
};

// Search trains (using mock data)
exports.searchTrains = (req, res) => {
  try {
    const { source, destination, date } = req.query;
    console.log('Search request received:', { source, destination, date });

    // Validate required parameters
    if (!source || !destination || !date) {
      return res.status(400).json({ 
        message: 'Missing required parameters. Please provide source, destination, and date.' 
      });
    }

    const searchDate = new Date(date);
    const dayOfWeek = searchDate.toLocaleString('en-us', { weekday: 'long' });

    console.log('Search Parameters:', {
      source,
      destination,
      date,
      dayOfWeek
    });

    const filteredTrains = mockTrains.filter(train => {
      const sourceMatch = train.source.toLowerCase() === source.toLowerCase();
      const destinationMatch = train.destination.toLowerCase() === destination.toLowerCase();
      const dayMatch = train.daysOfOperation.includes(dayOfWeek);
      const isActive = train.status === 'Active';

      console.log('Matching train:', {
        trainId: train._id,
        trainName: train.trainName,
        sourceMatch,
        destinationMatch,
        dayMatch,
        isActive
      });

      return sourceMatch && destinationMatch && dayMatch && isActive;
    });

    console.log('Found trains:', filteredTrains.length);

    if (filteredTrains.length === 0) {
      return res.status(404).json({ 
        message: 'No trains found for the given criteria.',
        searchCriteria: { source, destination, dayOfWeek }
      });
    }

    res.json(filteredTrains);
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ 
      message: 'Error searching trains', 
      error: error.message 
    });
  }
}; 
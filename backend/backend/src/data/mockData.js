const mockTrains = [
  {
    _id: "train1",
    trainNumber: "12345",
    trainName: "Chennai Express",
    source: "Mumbai",
    destination: "Chennai",
    departureTime: "2024-02-23T20:03:11.000Z",
    arrivalTime: "2024-02-24T08:03:11.000Z",
    status: "Active",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    classes: [
      {
        type: "1A",
        price: 3800,
        availableSeats: 42,
        totalSeats: 50
      },
      {
        type: "2A",
        price: 2500,
        availableSeats: 75,
        totalSeats: 100
      },
      {
        type: "3A",
        price: 1700,
        availableSeats: 110,
        totalSeats: 150
      },
      {
        type: "SL",
        price: 800,
        availableSeats: 250,
        totalSeats: 300
      }
    ]
  },
  {
    _id: "train2",
    trainNumber: "54321",
    trainName: "Rajdhani Express",
    source: "Delhi",
    destination: "Kolkata",
    departureTime: "2024-02-23T18:00:00.000Z",
    arrivalTime: "2024-02-24T06:00:00.000Z",
    status: "Active",
    daysOfOperation: ["Monday", "Wednesday", "Friday", "Sunday"],
    classes: [
      {
        type: "1A",
        price: 4200,
        availableSeats: 35,
        totalSeats: 40
      },
      {
        type: "2A",
        price: 2800,
        availableSeats: 65,
        totalSeats: 80
      },
      {
        type: "3A",
        price: 1900,
        availableSeats: 95,
        totalSeats: 120
      },
      {
        type: "SL",
        price: 900,
        availableSeats: 220,
        totalSeats: 280
      }
    ]
  },
  {
    _id: "train3",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani Express",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    arrivalTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000),
    duration: 960, // 16 hours in minutes
    classes: [
      { type: '1A', price: 4500, totalSeats: 50, availableSeats: 45 },
      { type: '2A', price: 2800, totalSeats: 100, availableSeats: 85 },
      { type: '3A', price: 1900, totalSeats: 150, availableSeats: 120 }
    ],
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    status: 'Active'
  },
  {
    _id: "train4",
    trainNumber: "12952",
    trainName: "Chennai Express",
    source: "Mumbai",
    destination: "Chennai",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000),
    duration: 1440, // 24 hours in minutes
    classes: [
      { type: '1A', price: 3800, totalSeats: 50, availableSeats: 42 },
      { type: '2A', price: 2500, totalSeats: 100, availableSeats: 75 },
      { type: '3A', price: 1700, totalSeats: 150, availableSeats: 110 },
      { type: 'SL', price: 800, totalSeats: 300, availableSeats: 250 }
    ],
    daysOfOperation: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
    status: 'Active'
  },
  {
    trainNumber: "12953",
    trainName: "Kolkata Duronto Express",
    source: "Delhi",
    destination: "Kolkata",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000),
    duration: 1080, // 18 hours in minutes
    classes: [
      { type: '1A', price: 4200, totalSeats: 50, availableSeats: 48 },
      { type: '2A', price: 2600, totalSeats: 100, availableSeats: 90 },
      { type: '3A', price: 1800, totalSeats: 150, availableSeats: 130 },
      { type: 'SL', price: 850, totalSeats: 300, availableSeats: 270 }
    ],
    daysOfOperation: ['Tuesday', 'Thursday', 'Saturday'],
    status: 'Active'
  },
  {
    trainNumber: "12954",
    trainName: "Bangalore Shatabdi",
    source: "Chennai",
    destination: "Bangalore",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
    duration: 360, // 6 hours in minutes
    classes: [
      { type: 'CC', price: 1200, totalSeats: 150, availableSeats: 140 },
      { type: 'EC', price: 2200, totalSeats: 100, availableSeats: 95 }
    ],
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    status: 'Active'
  },
  {
    trainNumber: "12955",
    trainName: "Hyderabad Express",
    source: "Mumbai",
    destination: "Hyderabad",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000),
    duration: 720, // 12 hours in minutes
    classes: [
      { type: '2A', price: 2200, totalSeats: 100, availableSeats: 88 },
      { type: '3A', price: 1500, totalSeats: 150, availableSeats: 125 },
      { type: 'SL', price: 700, totalSeats: 300, availableSeats: 260 }
    ],
    daysOfOperation: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
    status: 'Active'
  },
  {
    trainNumber: "12956",
    trainName: "Goa Express",
    source: "Mumbai",
    destination: "Goa",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
    duration: 600, // 10 hours in minutes
    classes: [
      { type: '2A', price: 1800, totalSeats: 100, availableSeats: 92 },
      { type: '3A', price: 1200, totalSeats: 150, availableSeats: 135 },
      { type: 'SL', price: 600, totalSeats: 300, availableSeats: 275 }
    ],
    daysOfOperation: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    status: 'Active'
  },
  {
    trainNumber: "12957",
    trainName: "Punjab Mail",
    source: "Delhi",
    destination: "Amritsar",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
    duration: 480, // 8 hours in minutes
    classes: [
      { type: '1A', price: 2800, totalSeats: 50, availableSeats: 45 },
      { type: '2A', price: 1800, totalSeats: 100, availableSeats: 85 },
      { type: '3A', price: 1200, totalSeats: 150, availableSeats: 130 },
      { type: 'SL', price: 500, totalSeats: 300, availableSeats: 250 }
    ],
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    status: 'Active'
  },
  {
    trainNumber: "12958",
    trainName: "Gujarat Sampark Kranti",
    source: "Delhi",
    destination: "Ahmedabad",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
    duration: 840, // 14 hours in minutes
    classes: [
      { type: '2A', price: 2200, totalSeats: 100, availableSeats: 90 },
      { type: '3A', price: 1500, totalSeats: 150, availableSeats: 135 },
      { type: 'SL', price: 700, totalSeats: 300, availableSeats: 270 }
    ],
    daysOfOperation: ['Monday', 'Wednesday', 'Friday'],
    status: 'Active'
  },
  {
    trainNumber: "12959",
    trainName: "Kerala Express",
    source: "Delhi",
    destination: "Trivandrum",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: 2880, // 48 hours in minutes
    classes: [
      { type: '1A', price: 5500, totalSeats: 50, availableSeats: 48 },
      { type: '2A', price: 3500, totalSeats: 100, availableSeats: 92 },
      { type: '3A', price: 2500, totalSeats: 150, availableSeats: 140 },
      { type: 'SL', price: 1200, totalSeats: 300, availableSeats: 280 }
    ],
    daysOfOperation: ['Tuesday', 'Friday', 'Sunday'],
    status: 'Active'
  },
  {
    trainNumber: "12960",
    trainName: "Deccan Queen",
    source: "Mumbai",
    destination: "Pune",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    duration: 180, // 3 hours in minutes
    classes: [
      { type: 'CC', price: 500, totalSeats: 150, availableSeats: 145 },
      { type: 'EC', price: 1000, totalSeats: 100, availableSeats: 95 }
    ],
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    status: 'Active'
  },
  {
    trainNumber: "12961",
    trainName: "Rajkot Express",
    source: "Rajkot",
    destination: "Mumbai",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
    duration: 600,
    classes: [
      { type: '2A', price: 2000, totalSeats: 100, availableSeats: 90 },
      { type: '3A', price: 1200, totalSeats: 150, availableSeats: 130 }
    ],
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'Active'
  },
];

const addTrain = (newTrain) => {
  mockTrains.push(newTrain);
};

module.exports = {
  mockTrains,
  addTrain: (newTrain) => {
    mockTrains.push(newTrain);
  }
};
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
  }
];

export default mockTrains;
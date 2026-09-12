const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Train = require('./models/Train');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const trains = [
  {
    trainNumber: "12951",
    name: "Mumbai Rajdhani",
    source: "MMCT", // Mumbai Central
    destination: "NDLS", // New Delhi
    runsOn: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    route: [
      { stationCode: "MMCT", stationName: "Mumbai Central", arrivalTime: "17:00", departureTime: "17:00", day: 1, distance: 0 },
      { stationCode: "BRC", stationName: "Vadodara Jn", arrivalTime: "21:30", departureTime: "21:40", day: 1, distance: 393 },
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "08:32", departureTime: "08:32", day: 2, distance: 1384 }
    ],
    classes: [
      { className: "1A", totalSeats: 20, fare: 4800 },
      { className: "2A", totalSeats: 100, fare: 2900 },
      { className: "3A", totalSeats: 300, fare: 2100 }
    ]
  },
  {
    trainNumber: "12009",
    name: "Shatabdi Express",
    source: "MMCT",
    destination: "ADI", // Ahmedabad
    runsOn: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
    route: [
      { stationCode: "MMCT", stationName: "Mumbai Central", arrivalTime: "06:20", departureTime: "06:20", day: 1, distance: 0 },
      { stationCode: "ST", stationName: "Surat", arrivalTime: "09:15", departureTime: "09:20", day: 1, distance: 263 },
      { stationCode: "ADI", stationName: "Ahmedabad Jn", arrivalTime: "12:40", departureTime: "12:40", day: 1, distance: 493 }
    ],
    classes: [
      { className: "EA", totalSeats: 40, fare: 2000 },
      { className: "CC", totalSeats: 300, fare: 1000 }
    ]
  },
  {
    trainNumber: "12269",
    name: "Duronto Express",
    source: "MAS", // Chennai Central
    destination: "NZM", // Hazrat Nizamuddin (Delhi)
    runsOn: ["MON", "FRI"],
    route: [
      { stationCode: "MAS", stationName: "Chennai Central", arrivalTime: "06:35", departureTime: "06:35", day: 1, distance: 0 },
      { stationCode: "BZA", stationName: "Vijayawada Jn", arrivalTime: "12:30", departureTime: "12:40", day: 1, distance: 431 },
      { stationCode: "NZM", stationName: "Hazrat Nizamuddin", arrivalTime: "10:40", departureTime: "10:40", day: 2, distance: 2175 }
    ],
    classes: [
      { className: "1A", totalSeats: 20, fare: 5200 },
      { className: "2A", totalSeats: 80, fare: 3100 },
      { className: "3A", totalSeats: 250, fare: 2300 },
      { className: "SL", totalSeats: 400, fare: 900 }
    ]
  }
];

const importData = async () => {
  try {
    await Train.deleteMany();
    await Train.insertMany(trains);
    console.log('Trains Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

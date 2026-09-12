const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Train = require('./models/Train');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const STATION_LIST = [
  { code: 'MMCT', name: 'Mumbai Central' },
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'ADI', name: 'Ahmedabad Jn' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'BZA', name: 'Vijayawada Jn' },
  { code: 'NZM', name: 'Hazrat Nizamuddin' },
  { code: 'ST', name: 'Surat' },
  { code: 'BRC', name: 'Vadodara Jn' },
  { code: 'HWH', name: 'Howrah Jn' },
  { code: 'PUNE', name: 'Pune Jn' },
  { code: 'SBC', name: 'KSR Bengaluru' },
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus' },
  { code: 'PNBE', name: 'Patna Jn' },
  { code: 'LKO', name: 'Lucknow Charbagh' },
  { code: 'CNB', name: 'Kanpur Central' },
  { code: 'JP', name: 'Jaipur Jn' }
];

const JUNCTIONS = [
  { code: 'BPL', name: 'Bhopal Jn' },
  { code: 'ET', name: 'Itarsi Jn' },
  { code: 'NGP', name: 'Nagpur Jn' },
  { code: 'JHS', name: 'Jhansi Jn' },
  { code: 'KOTA', name: 'Kota Jn' },
  { code: 'RTM', name: 'Ratlam Jn' },
  { code: 'GTL', name: 'Guntakal Jn' },
  { code: 'PRYJ', name: 'Prayagraj Jn' },
  { code: 'DDU', name: 'Pt. DD Upadhyaya Jn' },
  { code: 'BPQ', name: 'Balharshah' }
];

const TRAIN_TYPES = [
  { prefix: "Rajdhani Express", speed: 85, classes: ["1A", "2A", "3A"], multiplier: 1.5 },
  { prefix: "Shatabdi Express", speed: 80, classes: ["EA", "EC", "CC"], multiplier: 1.4 },
  { prefix: "Duronto Express", speed: 82, classes: ["1A", "2A", "3A", "SL"], multiplier: 1.3 },
  { prefix: "Superfast Express", speed: 65, classes: ["1A", "2A", "3A", "SL", "GEN"], multiplier: 1.0 },
  { prefix: "Mail", speed: 55, classes: ["1A", "2A", "3A", "SL", "GEN"], multiplier: 0.9 },
  { prefix: "Garib Rath", speed: 65, classes: ["3A", "CC"], multiplier: 0.8 },
  { prefix: "Vande Bharat", speed: 95, classes: ["EC", "CC"], multiplier: 1.6 },
];

const padZero = (num) => num.toString().padStart(2, '0');

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60) % 24;
  const m = Math.floor(minutes % 60);
  return `${padZero(h)}:${padZero(m)}`;
};

const generateTrains = () => {
  const trains = [];
  let trainNumCounter = 12000;

  for (let i = 0; i < STATION_LIST.length; i++) {
    for (let j = 0; j < STATION_LIST.length; j++) {
      if (i === j) continue; // Skip same station
      
      const source = STATION_LIST[i];
      const dest = STATION_LIST[j];
      
      // Calculate a base distance for realism (just random between 500 and 2000 km)
      const totalDistance = Math.floor(Math.random() * 1500) + 500;
      
      // Generate 4 to 5 trains for each route
      const numTrains = Math.floor(Math.random() * 2) + 4; 
      
      for (let k = 0; k < numTrains; k++) {
        const type = TRAIN_TYPES[Math.floor(Math.random() * TRAIN_TYPES.length)];
        const trainName = `${source.name.split(' ')[0]} - ${dest.name.split(' ')[0]} ${type.prefix}`;
        
        // Pick 2 random intermediate junctions
        const shuffledJunctions = [...JUNCTIONS].sort(() => 0.5 - Math.random());
        const j1 = shuffledJunctions[0];
        const j2 = shuffledJunctions[1];
        
        // Random departure time in minutes from midnight (0 to 24*60)
        let currentMins = Math.floor(Math.random() * 24 * 60);
        let currentDay = 1;
        let currentDist = 0;
        
        const route = [];
        
        // Add Source
        route.push({
          stationCode: source.code,
          stationName: source.name,
          arrivalTime: formatTime(currentMins),
          departureTime: formatTime(currentMins),
          day: currentDay,
          distance: currentDist
        });
        
        // Add Junction 1 (~33% distance)
        const dist1 = Math.floor(totalDistance * 0.33);
        const timeToJ1 = (dist1 / type.speed) * 60; // in minutes
        currentMins += timeToJ1;
        currentDist += dist1;
        if (currentMins >= 24 * 60) { currentDay++; currentMins -= 24 * 60; }
        
        route.push({
          stationCode: j1.code,
          stationName: j1.name,
          arrivalTime: formatTime(currentMins),
          departureTime: formatTime(currentMins + 10), // 10 min halt
          day: currentDay,
          distance: currentDist
        });
        currentMins += 10;
        
        // Add Junction 2 (~66% distance)
        const dist2 = Math.floor(totalDistance * 0.33);
        const timeToJ2 = (dist2 / type.speed) * 60;
        currentMins += timeToJ2;
        currentDist += dist2;
        if (currentMins >= 24 * 60) { currentDay++; currentMins -= 24 * 60; }
        
        route.push({
          stationCode: j2.code,
          stationName: j2.name,
          arrivalTime: formatTime(currentMins),
          departureTime: formatTime(currentMins + 10), // 10 min halt
          day: currentDay,
          distance: currentDist
        });
        currentMins += 10;
        
        // Add Destination (100% distance)
        const dist3 = totalDistance - currentDist;
        const timeToDest = (dist3 / type.speed) * 60;
        currentMins += timeToDest;
        currentDist = totalDistance;
        if (currentMins >= 24 * 60) { currentDay++; currentMins -= 24 * 60; }
        
        route.push({
          stationCode: dest.code,
          stationName: dest.name,
          arrivalTime: formatTime(currentMins),
          departureTime: formatTime(currentMins),
          day: currentDay,
          distance: currentDist
        });
        
        // Generate classes based on train type
        const classes = type.classes.map(c => {
          let baseFare = 0;
          if (c === "1A" || c === "EC" || c === "EA") baseFare = 3000;
          else if (c === "2A") baseFare = 1800;
          else if (c === "3A" || c === "CC") baseFare = 1200;
          else if (c === "SL") baseFare = 450;
          else baseFare = 200;
          
          return {
            className: c,
            totalSeats: Math.floor(Math.random() * 200) + 50,
            fare: Math.floor((baseFare * type.multiplier * (totalDistance / 1000)) + 50)
          };
        });

        trains.push({
          trainNumber: (trainNumCounter++).toString(),
          name: trainName,
          source: source.code,
          destination: dest.code,
          runsOn: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
          route: route,
          classes: classes
        });
      }
    }
  }
  return trains;
};

const importData = async () => {
  try {
    await Train.deleteMany();
    const mockTrains = generateTrains();
    await Train.insertMany(mockTrains);
    console.log(`${mockTrains.length} High-Fidelity Trains Imported with complete route tracking!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

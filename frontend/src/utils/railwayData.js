// Indian Railway Stations & Trains Master Database

export const INDIAN_STATIONS = [
  // Bihar / Patna Region
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna', state: 'Bihar', zone: 'ECR' },
  { code: 'RJPB', name: 'Rajendra Nagar Terminal', city: 'Patna', state: 'Bihar', zone: 'ECR' },
  { code: 'PPTA', name: 'Patliputra Junction', city: 'Patna', state: 'Bihar', zone: 'ECR' },
  { code: 'DNR', name: 'Danapur', city: 'Patna', state: 'Bihar', zone: 'ECR' },
  { code: 'GAYA', name: 'Gaya Junction', city: 'Gaya', state: 'Bihar', zone: 'ECR' },
  { code: 'DBG', name: 'Darbhanga Junction', city: 'Darbhanga', state: 'Bihar', zone: 'ECR' },
  { code: 'MFP', name: 'Muzaffarpur Junction', city: 'Muzaffarpur', state: 'Bihar', zone: 'ECR' },
  { code: 'BJU', name: 'Barauni Junction', city: 'Barauni', state: 'Bihar', zone: 'ECR' },
  { code: 'KGG', name: 'Khagaria Junction', city: 'Khagaria', state: 'Bihar', zone: 'ECR' },
  { code: 'KIR', name: 'Katihar Junction', city: 'Katihar', state: 'Bihar', zone: 'NFR' },

  // Delhi NCR
  { code: 'NDLS', name: 'New Delhi Railway Station', city: 'New Delhi', state: 'Delhi', zone: 'NR' },
  { code: 'DLI', name: 'Old Delhi Junction', city: 'New Delhi', state: 'Delhi', zone: 'NR' },
  { code: 'ANVT', name: 'Anand Vihar Terminal', city: 'New Delhi', state: 'Delhi', zone: 'NR' },
  { code: 'NZM', name: 'Hazrat Nizamuddin', city: 'New Delhi', state: 'Delhi', zone: 'NR' },
  { code: 'DEC', name: 'Delhi Cantt', city: 'New Delhi', state: 'Delhi', zone: 'NR' },

  // Uttar Pradesh
  { code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh', zone: 'NR' },
  { code: 'DDU', name: 'Pt. Deen Dayal Upadhyaya Jn (Mughalsarai)', city: 'Mughalsarai', state: 'Uttar Pradesh', zone: 'ECR' },
  { code: 'CNB', name: 'Kanpur Central', city: 'Kanpur', state: 'Uttar Pradesh', zone: 'NCR' },
  { code: 'LKO', name: 'Lucknow Charbagh NR', city: 'Lucknow', state: 'Uttar Pradesh', zone: 'NR' },
  { code: 'LJN', name: 'Lucknow Junction NER', city: 'Lucknow', state: 'Uttar Pradesh', zone: 'NER' },
  { code: 'PRYJ', name: 'Prayagraj Junction (Allahabad)', city: 'Prayagraj', state: 'Uttar Pradesh', zone: 'NCR' },
  { code: 'AGC', name: 'Agra Cantt', city: 'Agra', state: 'Uttar Pradesh', zone: 'NCR' },
  { code: 'GKP', name: 'Gorakhpur Junction', city: 'Gorakhpur', state: 'Uttar Pradesh', zone: 'NER' },
  { code: 'AY', name: 'Ayodhya Dham Junction', city: 'Ayodhya', state: 'Uttar Pradesh', zone: 'NR' },
  { code: 'MB', name: 'Moradabad Junction', city: 'Moradabad', state: 'Uttar Pradesh', zone: 'NR' },
  { code: 'BE', name: 'Bareilly Junction', city: 'Bareilly', state: 'Uttar Pradesh', zone: 'NR' },

  // Maharashtra / Mumbai / Pune
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', city: 'Mumbai', state: 'Maharashtra', zone: 'CR' },
  { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra', zone: 'WR' },
  { code: 'LTT', name: 'Lokmanya Tilak Terminus', city: 'Mumbai', state: 'Maharashtra', zone: 'CR' },
  { code: 'BDTS', name: 'Bandra Terminus', city: 'Mumbai', state: 'Maharashtra', zone: 'WR' },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra', zone: 'CR' },
  { code: 'NGP', name: 'Nagpur Junction', city: 'Nagpur', state: 'Maharashtra', zone: 'CR' },
  { code: 'SUR', name: 'Solapur Junction', city: 'Solapur', state: 'Maharashtra', zone: 'CR' },

  // West Bengal / Kolkata
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal', zone: 'ER' },
  { code: 'SDAH', name: 'Sealdah', city: 'Kolkata', state: 'West Bengal', zone: 'ER' },
  { code: 'KOAA', name: 'Kolkata Terminal', city: 'Kolkata', state: 'West Bengal', zone: 'ER' },
  { code: 'NJP', name: 'New Jalpaiguri', city: 'Siliguri', state: 'West Bengal', zone: 'NFR' },

  // Tamil Nadu & South India
  { code: 'MAS', name: 'Chennai Central', city: 'Chennai', state: 'Tamil Nadu', zone: 'SR' },
  { code: 'MS', name: 'Chennai Egmore', city: 'Chennai', state: 'Tamil Nadu', zone: 'SR' },
  { code: 'CBE', name: 'Coimbatore Junction', city: 'Coimbatore', state: 'Tamil Nadu', zone: 'SR' },
  { code: 'MDU', name: 'Madurai Junction', city: 'Madurai', state: 'Tamil Nadu', zone: 'SR' },

  // Karnataka
  { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru', state: 'Karnataka', zone: 'SWR' },
  { code: 'YPR', name: 'Yesvantpur Junction', city: 'Bengaluru', state: 'Karnataka', zone: 'SWR' },
  { code: 'MYS', name: 'Mysuru Junction', city: 'Mysuru', state: 'Karnataka', zone: 'SWR' },

  // Telangana & Andhra Pradesh
  { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad', state: 'Telangana', zone: 'SCR' },
  { code: 'HYB', name: 'Hyderabad Deccan', city: 'Hyderabad', state: 'Telangana', zone: 'SCR' },
  { code: 'VSKP', name: 'Visakhapatnam Junction', city: 'Visakhapatnam', state: 'Andhra Pradesh', zone: 'ECoR' },
  { code: 'BZA', name: 'Vijayawada Junction', city: 'Vijayawada', state: 'Andhra Pradesh', zone: 'SCR' },

  // Rajasthan
  { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur', state: 'Rajasthan', zone: 'NWR' },
  { code: 'JU', name: 'Jodhpur Junction', city: 'Jodhpur', state: 'Rajasthan', zone: 'NWR' },
  { code: 'UDZ', name: 'Udaipur City', city: 'Udaipur', state: 'Rajasthan', zone: 'NWR' },
  { code: 'KOTA', name: 'Kota Junction', city: 'Kota', state: 'Rajasthan', zone: 'WCR' },

  // Gujarat
  { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat', zone: 'WR' },
  { code: 'ST', name: 'Surat', city: 'Surat', state: 'Gujarat', zone: 'WR' },
  { code: 'BRC', name: 'Vadodara Junction', city: 'Vadodara', state: 'Gujarat', zone: 'WR' },

  // Madhya Pradesh
  { code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal', state: 'Madhya Pradesh', zone: 'WCR' },
  { code: 'INDB', name: 'Indore Junction', city: 'Indore', state: 'Madhya Pradesh', zone: 'WR' },
  { code: 'JBP', name: 'Jabalpur Junction', city: 'Jabalpur', state: 'Madhya Pradesh', zone: 'WCR' },

  // Odisha, Punjab, Haryana, J&K, Goa, Assam
  { code: 'BBS', name: 'Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', zone: 'ECoR' },
  { code: 'PURI', name: 'Puri', city: 'Puri', state: 'Odisha', zone: 'ECoR' },
  { code: 'ASR', name: 'Amritsar Junction', city: 'Amritsar', state: 'Punjab', zone: 'NR' },
  { code: 'LDH', name: 'Ludhiana Junction', city: 'Ludhiana', state: 'Punjab', zone: 'NR' },
  { code: 'CDG', name: 'Chandigarh Junction', city: 'Chandigarh', state: 'Chandigarh', zone: 'NR' },
  { code: 'JAT', name: 'Jammu Tawi', city: 'Jammu', state: 'Jammu & Kashmir', zone: 'NR' },
  { code: 'MAO', name: 'Madgaon Junction', city: 'Goa', state: 'Goa', zone: 'KR' },
  { code: 'GHY', name: 'Guwahati', city: 'Guwahati', state: 'Assam', zone: 'NFR' }
];

export const MASTER_TRAINS = [
  // Patna <-> New Delhi
  {
    id: '12393',
    trainNumber: '12393',
    trainName: 'Sampoorna Kranti Express',
    departureStation: 'PNBE',
    departureCity: 'Patna Junction',
    arrivalStation: 'NDLS',
    arrivalCity: 'New Delhi',
    departureTime: '19:25',
    arrivalTime: '07:55',
    duration: '12h 30m',
    classes: 'Sleeper | AC 3 Tier | AC 2 Tier | AC 1st Class',
    isPopular: true,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    fares: { SL: 385, '3A': 1360, '2A': 1950, '1A': 3240 }
  },
  {
    id: '12309',
    trainNumber: '12309',
    trainName: 'Patna Rajdhani Express',
    departureStation: 'RJPB',
    departureCity: 'Patna (Rajendra Nagar)',
    arrivalStation: 'NDLS',
    arrivalCity: 'New Delhi',
    departureTime: '19:10',
    arrivalTime: '07:40',
    duration: '12h 30m',
    classes: 'AC 3 Tier | AC 2 Tier | AC 1st Class',
    isPopular: true,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    fares: { '3A': 1750, '2A': 2540, '1A': 4150 }
  },
  {
    id: '22345',
    trainNumber: '22345',
    trainName: 'Patna - New Delhi Vande Bharat',
    departureStation: 'PNBE',
    departureCity: 'Patna Junction',
    arrivalStation: 'NDLS',
    arrivalCity: 'New Delhi',
    departureTime: '06:00',
    arrivalTime: '14:30',
    duration: '8h 30m',
    classes: 'AC Chair Car | Executive Chair Car',
    isPopular: true,
    runningDays: ['M', 'T', 'W', 'F', 'S', 'S'],
    fares: { CC: 1450, EC: 2890 }
  },
  {
    id: '12391',
    trainNumber: '12391',
    trainName: 'Shramjeevi Express',
    departureStation: 'PNBE',
    departureCity: 'Patna Junction',
    arrivalStation: 'NDLS',
    arrivalCity: 'New Delhi',
    departureTime: '10:30',
    arrivalTime: '04:45',
    duration: '18h 15m',
    classes: 'Sleeper | AC 3 Tier | AC 2 Tier',
    isPopular: false,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    fares: { SL: 395, '3A': 1390, '2A': 1990 }
  },
  {
    id: '12401',
    trainNumber: '12401',
    trainName: 'Magadh Express',
    departureStation: 'PNBE',
    departureCity: 'Patna Junction',
    arrivalStation: 'NDLS',
    arrivalCity: 'New Delhi',
    departureTime: '18:40',
    arrivalTime: '11:50',
    duration: '17h 10m',
    classes: 'Sleeper | AC 3 Tier | AC 2 Tier | AC 1st Class',
    isPopular: false,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    fares: { SL: 410, '3A': 1410, '2A': 2010, '1A': 3350 }
  },

  // Patna <-> Kolkata
  {
    id: '12024',
    trainNumber: '12024',
    trainName: 'Patna - Howrah Jan Shatabdi',
    departureStation: 'PNBE',
    departureCity: 'Patna Junction',
    arrivalStation: 'HWH',
    arrivalCity: 'Howrah (Kolkata)',
    departureTime: '05:30',
    arrivalTime: '13:25',
    duration: '7h 55m',
    classes: '2S Chair Car | AC Chair Car',
    isPopular: true,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S'],
    fares: { SL: 220, CC: 680 }
  },

  // NDLS <-> BSB
  {
    id: '12561',
    trainNumber: '12561',
    trainName: 'Swatantrata Senani Express',
    departureStation: 'NDLS',
    departureCity: 'New Delhi',
    arrivalStation: 'BSB',
    arrivalCity: 'Varanasi Junction',
    departureTime: '21:15',
    arrivalTime: '05:30',
    duration: '8h 15m',
    classes: 'Sleeper | AC 3 Tier | AC 2 Tier',
    isPopular: true,
    runningDays: ['M','T','W','T','F','S','S'],
    fares: { SL: 285, '3A': 1210, '2A': 1845 }
  },
  {
    id: '22436',
    trainNumber: '22436',
    trainName: 'Vande Bharat Express',
    departureStation: 'NDLS',
    departureCity: 'New Delhi',
    arrivalStation: 'BSB',
    arrivalCity: 'Varanasi Junction',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8h 00m',
    classes: 'AC 3 Tier | AC 2 Tier',
    isPopular: true,
    runningDays: ['M','T','W','F','S','S'],
    fares: { '3A': 1750, '2A': 3300 }
  },

  // CSMT <-> PUNE
  {
    id: '12123',
    trainNumber: '12123',
    trainName: 'Deccan Queen Express',
    departureStation: 'CSMT',
    departureCity: 'Mumbai',
    arrivalStation: 'PUNE',
    arrivalCity: 'Pune',
    departureTime: '17:10',
    arrivalTime: '20:25',
    duration: '3h 15m',
    classes: 'Sleeper | AC 3 Tier | AC 2 Tier',
    isPopular: true,
    runningDays: ['M','T','W','T','F','S','S'],
    fares: { SL: 145, '3A': 480, '2A': 850 }
  },

  // MAS <-> SBC
  {
    id: '12027',
    trainNumber: '12027',
    trainName: 'Chennai-Bengaluru Shatabdi',
    departureStation: 'MAS',
    departureCity: 'Chennai Central',
    arrivalStation: 'SBC',
    arrivalCity: 'Bengaluru Central',
    departureTime: '17:30',
    arrivalTime: '22:30',
    duration: '5h 00m',
    classes: 'AC 3 Tier | AC 2 Tier',
    isPopular: true,
    runningDays: ['M','T','W','T','F','S'],
    fares: { '3A': 980, '2A': 1650 }
  }
];

// Search Station helper function matching name, code, or city
export const searchStations = (query) => {
  if (!query || typeof query !== 'string') return [];
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return INDIAN_STATIONS.filter(st => 
    st.code.toLowerCase().includes(clean) ||
    st.name.toLowerCase().includes(clean) ||
    st.city.toLowerCase().includes(clean) ||
    st.state.toLowerCase().includes(clean)
  );
};

// Deterministic Real-time Seat Availability Generator for any train, class & date
export const calculateSeatAvailability = (trainNumber, className, dateStr) => {
  const seedStr = `${trainNumber}-${className}-${dateStr || '2025-09-20'}`;
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const statusType = positiveHash % 10;
  
  if (statusType < 6) {
    const seats = 15 + (positiveHash % 110);
    return {
      status: 'AVAILABLE',
      count: seats,
      text: `AVAILABLE - ${seats.toString().padStart(4, '0')}`,
      color: 'green',
      type: 'success',
      badgeBg: '#e6f4ea',
      badgeText: '#137333'
    };
  } else if (statusType < 8) {
    const racNum = 1 + (positiveHash % 25);
    return {
      status: 'RAC',
      count: racNum,
      text: `RAC - ${racNum.toString().padStart(3, '0')}`,
      color: 'orange',
      type: 'warning',
      badgeBg: '#fff7e6',
      badgeText: '#d46b08'
    };
  } else {
    const wlNum = 1 + (positiveHash % 45);
    return {
      status: 'WL',
      count: wlNum,
      text: `WL - ${wlNum.toString().padStart(3, '0')}`,
      color: 'red',
      type: 'error',
      badgeBg: '#fff2e8',
      badgeText: '#d4380d'
    };
  }
};

// Find matching trains between any station pair
export const findTrainsForRoute = (srcInput, dstInput, dateStr, classFilter = 'all') => {
  const cleanSrc = (srcInput || '').trim().toUpperCase();
  const cleanDst = (dstInput || '').trim().toUpperCase();

  // Find matching station objects
  const srcStation = INDIAN_STATIONS.find(s => 
    s.code === cleanSrc || s.name.toUpperCase().includes(cleanSrc) || s.city.toUpperCase().includes(cleanSrc)
  ) || { code: cleanSrc || 'NDLS', name: cleanSrc || 'Departure', city: cleanSrc || 'City' };

  const dstStation = INDIAN_STATIONS.find(s => 
    s.code === cleanDst || s.name.toUpperCase().includes(cleanDst) || s.city.toUpperCase().includes(cleanDst)
  ) || { code: cleanDst || 'BSB', name: cleanDst || 'Destination', city: cleanDst || 'City' };

  // 1. Check direct matches in MASTER_TRAINS
  let directMatches = MASTER_TRAINS.filter(t => {
    const matchSrc = t.departureStation === srcStation.code || 
                     t.departureCity.toLowerCase().includes(srcStation.city.toLowerCase()) ||
                     srcStation.name.toLowerCase().includes(t.departureCity.toLowerCase());
    const matchDst = t.arrivalStation === dstStation.code || 
                     t.arrivalCity.toLowerCase().includes(dstStation.city.toLowerCase()) ||
                     dstStation.name.toLowerCase().includes(t.arrivalCity.toLowerCase());
    return matchSrc && matchDst;
  });

  // 2. Check reverse matches in MASTER_TRAINS
  if (directMatches.length === 0) {
    const reverseMatches = MASTER_TRAINS.filter(t => {
      const matchSrc = t.arrivalStation === srcStation.code || 
                       t.arrivalCity.toLowerCase().includes(srcStation.city.toLowerCase());
      const matchDst = t.departureStation === dstStation.code || 
                       t.departureCity.toLowerCase().includes(dstStation.city.toLowerCase());
      return matchSrc && matchDst;
    });

    if (reverseMatches.length > 0) {
      directMatches = reverseMatches.map(t => ({
        ...t,
        id: `${t.id}-REV`,
        departureStation: srcStation.code,
        departureCity: srcStation.name,
        arrivalStation: dstStation.code,
        arrivalCity: dstStation.name
      }));
    }
  }

  // 3. Realistic Dynamic Train Generator for any station pair in India!
  if (directMatches.length === 0 && srcStation.code !== dstStation.code) {
    const srcName = srcStation.city || srcStation.name;
    const dstName = dstStation.city || dstStation.name;

    directMatches = [
      {
        id: `dyn-1-${srcStation.code}-${dstStation.code}`,
        trainNumber: '12393',
        trainName: `${srcName} - ${dstName} Superfast Express`,
        departureStation: srcStation.code,
        departureCity: srcStation.name,
        arrivalStation: dstStation.code,
        arrivalCity: dstStation.name,
        departureTime: '06:15',
        arrivalTime: '14:45',
        duration: '8h 30m',
        classes: 'Sleeper | AC 3 Tier | AC 2 Tier | AC 1st Class',
        isPopular: true,
        runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        fares: { SL: 340, '3A': 1280, '2A': 1890, '1A': 3150 }
      },
      {
        id: `dyn-2-${srcStation.code}-${dstStation.code}`,
        trainNumber: '22345',
        trainName: `${srcName} - ${dstName} Vande Bharat Express`,
        departureStation: srcStation.code,
        departureCity: srcStation.name,
        arrivalStation: dstStation.code,
        arrivalCity: dstStation.name,
        departureTime: '15:20',
        arrivalTime: '21:50',
        duration: '6h 30m',
        classes: 'AC Chair Car | Executive Chair Car',
        isPopular: true,
        runningDays: ['M', 'T', 'W', 'F', 'S', 'S'],
        fares: { CC: 1250, EC: 2420 }
      },
      {
        id: `dyn-3-${srcStation.code}-${dstStation.code}`,
        trainNumber: '12401',
        trainName: `${srcName} - ${dstName} Sampark Kranti`,
        departureStation: srcStation.code,
        departureCity: srcStation.name,
        arrivalStation: dstStation.code,
        arrivalCity: dstStation.name,
        departureTime: '21:40',
        arrivalTime: '07:15',
        duration: '9h 35m',
        classes: 'Sleeper | AC 3 Tier | AC 2 Tier',
        isPopular: false,
        runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        fares: { SL: 310, '3A': 1190, '2A': 1780 }
      }
    ];
  }

  // Attach dynamic real-time seat availability to every train fare class
  return directMatches.map(t => {
    const updatedFares = {};
    if (t.fares) {
      Object.keys(t.fares).forEach(cls => {
        updatedFares[cls] = {
          price: t.fares[cls],
          availability: calculateSeatAvailability(t.trainNumber, cls, dateStr)
        };
      });
    }
    return {
      ...t,
      fareDetails: updatedFares
    };
  });
};

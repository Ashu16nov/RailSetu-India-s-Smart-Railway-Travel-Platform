import { create } from 'zustand';
import axios from 'axios';

const DEFAULT_SEED_BOOKINGS = [
  {
    _id: 'bk_101',
    pnr: '2457812365',
    passengerName: 'Ashu',
    mobileNumber: '+91 9876543210',
    trainName: 'Sampoorna Kranti Express',
    trainNumber: '12393',
    source: 'Patna Junction (PNBE)',
    destination: 'New Delhi (NDLS)',
    journeyDate: '2026-09-28',
    journeyTime: '19:25',
    className: '3AC',
    coach: 'B2',
    berth: 24,
    status: 'CONFIRMED',
    totalFare: 1450,
    createdAt: '2026-09-24T12:00:00.000Z'
  },
  {
    _id: 'bk_102',
    pnr: '8492019384',
    passengerName: 'Rohan Sharma',
    mobileNumber: '+91 9123456789',
    trainName: 'Vande Bharat Express',
    trainNumber: '22345',
    source: 'Patna Junction (PNBE)',
    destination: 'Howrah Junction (HWH)',
    journeyDate: '2026-09-29',
    journeyTime: '05:30',
    className: 'CC',
    coach: 'C1',
    berth: 12,
    status: 'CONFIRMED',
    totalFare: 1680,
    createdAt: '2026-09-24T14:30:00.000Z'
  },
  {
    _id: 'bk_103',
    pnr: '4920193847',
    passengerName: 'Priya Verma',
    mobileNumber: '+91 9811223344',
    trainName: 'Rajdhani Express',
    trainNumber: '12951',
    source: 'New Delhi (NDLS)',
    destination: 'Mumbai Central (MMCT)',
    journeyDate: '2026-09-30',
    journeyTime: '16:55',
    className: '2AC',
    coach: 'A1',
    berth: 18,
    status: 'RAC',
    totalFare: 2950,
    createdAt: '2026-09-25T09:15:00.000Z'
  },
  {
    _id: 'bk_104',
    pnr: '7493029481',
    passengerName: 'Vikram Singh',
    mobileNumber: '+91 9765432100',
    trainName: 'Varanasi Vande Bharat',
    trainNumber: '22436',
    source: 'New Delhi (NDLS)',
    destination: 'Varanasi Junction (BSB)',
    journeyDate: '2026-10-01',
    journeyTime: '06:00',
    className: 'EC',
    coach: 'E1',
    berth: 8,
    status: 'CONFIRMED',
    totalFare: 2400,
    createdAt: '2026-09-25T11:00:00.000Z'
  }
];

const stored = JSON.parse(localStorage.getItem('railsetu_bookings'));
const INITIAL_BOOKINGS = (stored && stored.length > 0) ? stored : DEFAULT_SEED_BOOKINGS;

const useBookingStore = create((set, get) => ({
  bookings: INITIAL_BOOKINGS,
  loading: false,
  error: null,

  fetchBookings: async () => {
    set({ loading: true });
    try {
      const user = JSON.parse(localStorage.getItem('railsetu_user'));
      if (user && user.token && !user.token.startsWith('mock_') && !user.token.startsWith('jwt_authorized_token')) {
        const { data } = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        localStorage.setItem('railsetu_bookings', JSON.stringify(data));
        set({ bookings: data, loading: false });
        return;
      }
    } catch (error) {
      console.log('Backend offline, using local store');
    }
    const localBookings = JSON.parse(localStorage.getItem('railsetu_bookings')) || [];
    set({ bookings: localBookings, loading: false });
  },

  addBooking: (bookingData) => {
    const existing = JSON.parse(localStorage.getItem('railsetu_bookings')) || [];
    const newBooking = {
      _id: 'bk_' + Date.now(),
      pnr: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      trainName: bookingData.trainName || 'Rajdhani Express',
      trainNumber: bookingData.trainNumber || '12951',
      source: bookingData.source || 'New Delhi (NDLS)',
      destination: bookingData.destination || 'Varanasi (BSB)',
      journeyDate: bookingData.journeyDate || new Date().toISOString().split('T')[0],
      journeyTime: bookingData.journeyTime || '16:45',
      className: bookingData.className || '3AC',
      coach: bookingData.coach || 'B' + (Math.floor(Math.random() * 5) + 1),
      berth: bookingData.berth || Math.floor(Math.random() * 64) + 1,
      status: 'CONFIRMED',
      totalFare: bookingData.totalFare || 1450,
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    const updated = [newBooking, ...existing];
    localStorage.setItem('railsetu_bookings', JSON.stringify(updated));
    set({ bookings: updated });
    return newBooking;
  },

  clearBookings: () => {
    localStorage.removeItem('railsetu_bookings');
    set({ bookings: [] });
  },

  cancelBooking: (bookingId) => {
    const list = get().bookings || [];
    const updated = list.map((b) =>
      b._id === bookingId || b.pnr === bookingId || b.bookingId === bookingId
        ? { ...b, status: 'CANCELLED' }
        : b
    );
    localStorage.setItem('railsetu_bookings', JSON.stringify(updated));
    set({ bookings: updated });
  },

  updateBooking: (bookingId, updatedFields) => {
    const list = get().bookings || [];
    const updated = list.map((b) =>
      b._id === bookingId || b.pnr === bookingId || b.bookingId === bookingId
        ? { ...b, ...updatedFields }
        : b
    );
    localStorage.setItem('railsetu_bookings', JSON.stringify(updated));
    set({ bookings: updated });
  },

  deleteBooking: (bookingId) => {
    const list = get().bookings || [];
    const updated = list.filter((b) => b._id !== bookingId && b.pnr !== bookingId && b.bookingId !== bookingId);
    localStorage.setItem('railsetu_bookings', JSON.stringify(updated));
    set({ bookings: updated });
  },

  getBookingByPNR: (pnrNumber) => {
    if (!pnrNumber) return null;
    const cleanPnr = pnrNumber.trim();
    const list = get().bookings || [];
    const found = list.find((b) => b.pnr === cleanPnr || b.pnrNumber === cleanPnr);

    if (found) {
      const srcStr = found.source || 'New Delhi (NDLS)';
      const dstStr = found.destination || 'Varanasi (BSB)';
      const srcCode = srcStr.includes('(') ? srcStr.match(/\(([^)]+)\)/)?.[1] || 'NDLS' : srcStr.slice(0, 4).toUpperCase();
      const dstCode = dstStr.includes('(') ? dstStr.match(/\(([^)]+)\)/)?.[1] || 'BSB' : dstStr.slice(0, 4).toUpperCase();

      const rawPassengers = Array.isArray(found.passengers) && found.passengers.length > 0 
        ? found.passengers 
        : [{ name: found.passengerName || 'Ashu Kumar', age: 26, gender: 'Male' }];

      const formattedPassengers = rawPassengers.map((p, idx) => ({
        sNo: idx + 1,
        name: p.name || `Passenger ${idx + 1}`,
        age: p.age || 26,
        gender: p.gender || 'Male',
        status: p.status || found.status || 'CNF',
        berth: p.seatNumber || (found.coach ? `${found.coach}-${found.berth || (idx + 1) * 12}` : `B2-${18 + idx * 6}`),
        coach: p.coach || found.coach || 'B2'
      }));

      return {
        pnr: found.pnr || cleanPnr,
        bookingDate: found.createdAt ? new Date(found.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '14 Sep 2025',
        trainNumber: found.trainNumber || '12561',
        trainName: found.trainName || 'Swatantrata Senani Express',
        source: srcCode,
        sourceFull: srcStr,
        destination: dstCode,
        destinationFull: dstStr,
        journeyDate: found.journeyDate || '20 Sep 2025',
        className: found.className || '3A (AC 3 Tier)',
        departureTime: found.journeyTime || '21:15',
        arrivalTime: '05:30',
        duration: '8h 15m',
        currentStatus: found.status === 'CANCELED' ? 'Cancelled' : 'On Time',
        status: found.status === 'CANCELED' ? 'Cancelled' : (found.status || 'Confirmed'),
        passengers: formattedPassengers
      };
    }

    // Check sample default PNR
    if (cleanPnr === '2457812365') {
      return {
        pnr: '2457812365',
        bookingDate: '12 Sep 2025',
        trainNumber: '12561',
        trainName: 'Swatantrata Senani Express',
        source: 'NDLS',
        sourceFull: 'New Delhi (NDLS)',
        destination: 'BSB',
        destinationFull: 'Varanasi Junction (BSB)',
        journeyDate: '20 Sep 2025',
        className: '3A (AC 3 Tier)',
        departureTime: '21:15',
        arrivalTime: '05:30',
        duration: '8h 15m',
        currentStatus: 'On Time',
        status: 'Confirmed',
        passengers: [
          { sNo: 1, name: 'Ashu Kumar', age: 26, gender: 'Male', status: 'CNF', berth: 'B2-24', coach: 'B2' },
          { sNo: 2, name: 'Priya Sharma', age: 24, gender: 'Female', status: 'CNF', berth: 'B2-25', coach: 'B2' },
          { sNo: 3, name: 'Rohit Verma', age: 30, gender: 'Male', status: 'CNF', berth: 'B2-26', coach: 'B2' }
        ]
      };
    }

    // Must be 10 digits
    if (!/^\d{10}$/.test(cleanPnr)) {
      return null;
    }

    // Deterministic Mock Data Generator for any valid 10-digit PNR
    const pnrSum = cleanPnr.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
    const trains = [
      { trainNumber: '12951', trainName: 'Rajdhani Express', source: 'NDLS', sourceFull: 'New Delhi (NDLS)', destination: 'MMCT', destinationFull: 'Mumbai Central (MMCT)', departureTime: '16:55', arrivalTime: '08:35', duration: '15h 40m', className: '1A (AC 1st Class)' },
      { trainNumber: '12561', trainName: 'Swatantrata Senani Exp', source: 'NDLS', sourceFull: 'New Delhi (NDLS)', destination: 'BSB', destinationFull: 'Varanasi Junction (BSB)', departureTime: '21:15', arrivalTime: '05:30', duration: '8h 15m', className: '3A (AC 3 Tier)' },
      { trainNumber: '20685', trainName: 'Vande Bharat Express', source: 'MAS', sourceFull: 'Chennai Central (MAS)', destination: 'SBC', destinationFull: 'KSR Bengaluru (SBC)', departureTime: '05:50', arrivalTime: '10:15', duration: '4h 25m', className: 'CC (AC Chair Car)' },
      { trainNumber: '12002', name: 'Shatabdi Express', source: 'NDLS', sourceFull: 'New Delhi (NDLS)', destination: 'BPL', destinationFull: 'Bhopal Junction (BPL)', departureTime: '06:00', arrivalTime: '14:05', duration: '8h 05m', className: '2A (AC 2 Tier)' },
      { trainNumber: '12260', trainName: 'Duronto Express', source: 'HWH', sourceFull: 'Howrah Junction (HWH)', destination: 'SDAH', destinationFull: 'Sealdah (SDAH)', departureTime: '20:20', arrivalTime: '12:55', duration: '16h 35m', className: 'SL (Sleeper Class)' }
    ];

    const selectedTrain = trains[pnrSum % trains.length];
    const statuses = ['Confirmed', 'Confirmed', 'RAC', 'Waiting List'];
    const currentStatus = statuses[pnrSum % statuses.length];
    const passStatus = currentStatus === 'Confirmed' ? 'CNF' : (currentStatus === 'RAC' ? 'RAC 14' : 'WL 28');

    return {
      pnr: cleanPnr,
      bookingDate: '10 Sep 2025',
      trainNumber: selectedTrain.trainNumber,
      trainName: selectedTrain.trainName,
      source: selectedTrain.source,
      sourceFull: selectedTrain.sourceFull,
      destination: selectedTrain.destination,
      destinationFull: selectedTrain.destinationFull,
      journeyDate: '24 Sep 2025',
      className: selectedTrain.className,
      departureTime: selectedTrain.departureTime,
      arrivalTime: selectedTrain.arrivalTime,
      duration: selectedTrain.duration,
      currentStatus: currentStatus === 'Confirmed' ? 'On Time' : 'Delayed by 15m',
      status: currentStatus,
      passengers: [
        { sNo: 1, name: 'Ashu Kumar', age: 26, gender: 'Male', status: passStatus, berth: currentStatus === 'Confirmed' ? 'B3-14' : 'RAC-07', coach: 'B3' },
        { sNo: 2, name: 'Suman Kumar', age: 28, gender: 'Male', status: passStatus, berth: currentStatus === 'Confirmed' ? 'B3-15' : 'RAC-08', coach: 'B3' }
      ]
    };
  }
}));

export default useBookingStore;

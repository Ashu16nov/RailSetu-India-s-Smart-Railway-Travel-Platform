import { create } from 'zustand';
import axios from 'axios';

const INITIAL_BOOKINGS = JSON.parse(localStorage.getItem('railsetu_bookings')) || [];

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

  getBookingByPNR: (pnrNumber) => {
    const list = get().bookings || [];
    const found = list.find((b) => b.pnr === pnrNumber);
    if (found) return found;

    // Default mock PNR matching uploaded image precisely
    if (pnrNumber === '2457812365' || !pnrNumber) {
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
          { sNo: 1, name: 'Ashu Kumar', age: 26, gender: 'Male', status: 'CNF', berth: 'B2', coach: 'B2' },
          { sNo: 2, name: 'Priya Sharma', age: 24, gender: 'Female', status: 'CNF', berth: 'B2', coach: 'B2' },
          { sNo: 3, name: 'Rohit Verma', age: 30, gender: 'Male', status: 'CNF', berth: 'B2', coach: 'B2' }
        ]
      };
    }

    // Dynamic fallback mock generator for any other 10-digit PNR
    return {
      pnr: pnrNumber,
      bookingDate: '14 Sep 2025',
      trainNumber: '20685',
      trainName: 'Vande Bharat Express',
      source: 'NDLS',
      sourceFull: 'New Delhi (NDLS)',
      destination: 'BSB',
      destinationFull: 'Varanasi Junction (BSB)',
      journeyDate: '22 Sep 2025',
      className: 'CC (Chair Car)',
      departureTime: '06:00',
      arrivalTime: '14:00',
      duration: '8h 00m',
      currentStatus: 'On Time',
      status: 'Confirmed',
      passengers: [
        { sNo: 1, name: 'Ashu Kumar', age: 26, gender: 'Male', status: 'CNF', berth: 'C4', coach: 'C4' }
      ]
    };
  }
}));

export default useBookingStore;

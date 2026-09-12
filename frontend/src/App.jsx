import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import PNRStatus from './pages/PNRStatus';
import TrackTrain from './pages/TrackTrain';
import FoodBooking from './pages/FoodBooking';
import RailMadad from './pages/RailMadad';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#f0f2f5' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pnr" element={<PNRStatus />} />
          <Route path="/track" element={<TrackTrain />} />
          <Route path="/food" element={<FoodBooking />} />
          <Route path="/madad" element={<RailMadad />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

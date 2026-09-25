import React, { useState, useMemo, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Input, 
  Select, 
  DatePicker, 
  Checkbox, 
  Button, 
  Divider, 
  Radio, 
  Tag, 
  Modal, 
  Form, 
  message,
  AutoComplete
} from 'antd';
import { SwapOutlined, SearchOutlined, CheckCircleOutlined, DownOutlined } from '@ant-design/icons';
import { 
  Train, 
  MapPin, 
  Clock, 
  User, 
  ShieldCheck, 
  Phone, 
  Mail, 
  CreditCard, 
  Wallet, 
  FileText, 
  HelpCircle, 
  ArrowRight,
  CheckCircle,
  Shield,
  Ticket
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import useBookingStore from '../store/useBookingStore';
import useAuthStore from '../store/useAuthStore';
import { INDIAN_STATIONS, searchStations, findTrainsForRoute, calculateSeatAvailability } from '../utils/railwayData';

const { Title, Text } = Typography;

const stationCityMap = {
  'NDLS': 'New Delhi',
  'DELHI': 'New Delhi',
  'NEW DELHI': 'New Delhi',
  'BSB': 'Varanasi Junction',
  'VARANASI': 'Varanasi Junction',
  'CSMT': 'Mumbai',
  'BCT': 'Mumbai',
  'MUMBAI': 'Mumbai',
  'PUNE': 'Pune',
  'MAS': 'Chennai Central',
  'CHENNAI': 'Chennai Central',
  'SBC': 'Bengaluru Central',
  'BANGALORE': 'Bengaluru Central',
  'BENGALURU': 'Bengaluru Central',
  'HWH': 'Kolkata (Howrah)',
  'KOAA': 'Kolkata',
  'KOLKATA': 'Kolkata',
  'JP': 'Jaipur',
  'JAIPUR': 'Jaipur',
  'LKO': 'Lucknow',
  'LUCKNOW': 'Lucknow',
  'ADI': 'Ahmedabad',
  'AHMEDABAD': 'Ahmedabad',
  'GHY': 'Guwahati',
  'GUWAHATI': 'Guwahati',
  'PNBE': 'Patna',
  'PATNA': 'Patna',
  'CNB': 'Kanpur Central',
  'KANPUR': 'Kanpur Central'
};

const masterTrainDatabase = [
  // NDLS -> BSB
  { id: '12561', trainNumber: '12561', trainName: 'Swatantrata Senani Express', departureStation: 'NDLS', departureCity: 'New Delhi', arrivalStation: 'BSB', arrivalCity: 'Varanasi Junction', departureTime: '21:15', arrivalTime: '05:30', duration: '8h 15m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier | General', isPopular: true, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 285, '3A': 1210, '2A': 1845 } },
  { id: '12302', trainNumber: '12302', trainName: 'Poorva Express', departureStation: 'NDLS', departureCity: 'New Delhi', arrivalStation: 'BSB', arrivalCity: 'Varanasi Junction', departureTime: '23:55', arrivalTime: '08:50', duration: '8h 55m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier | General', isPopular: false, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 310, '3A': 1350, '2A': 2050 } },
  { id: '12138', trainNumber: '12138', trainName: 'Intercity Express', departureStation: 'NDLS', departureCity: 'New Delhi', arrivalStation: 'BSB', arrivalCity: 'Varanasi Junction', departureTime: '06:00', arrivalTime: '16:45', duration: '10h 45m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier | General', isPopular: false, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 270, '3A': 1180, '2A': 1790 } },
  { id: '14236', trainNumber: '14236', trainName: 'Kashi Vishwanath Express', departureStation: 'NDLS', departureCity: 'New Delhi', arrivalStation: 'BSB', arrivalCity: 'Varanasi Junction', departureTime: '14:05', arrivalTime: '23:25', duration: '9h 20m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier | General', isPopular: false, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 295, '3A': 1280, '2A': 1950 } },
  { id: '12259', trainNumber: '12259', trainName: 'Poorva Express (Via Gaya)', departureStation: 'NDLS', departureCity: 'New Delhi', arrivalStation: 'BSB', arrivalCity: 'Varanasi Junction', departureTime: '17:25', arrivalTime: '05:35', duration: '12h 10m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier | General', isPopular: false, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 320, '3A': 1400, '2A': 2150 } },
  { id: '22436', trainNumber: '22436', trainName: 'Vande Bharat Express', departureStation: 'NDLS', departureCity: 'New Delhi', arrivalStation: 'BSB', arrivalCity: 'Varanasi Junction', departureTime: '06:00', arrivalTime: '14:00', duration: '8h 00m', classes: 'AC 3 Tier | AC 2 Tier', isPopular: true, runningDays: ['M','T','W','F','S','S'], fares: { '3A': 1750, '2A': 3300 } },

  // CSMT -> PUNE
  { id: '12123', trainNumber: '12123', trainName: 'Deccan Queen Express', departureStation: 'CSMT', departureCity: 'Mumbai', arrivalStation: 'PUNE', arrivalCity: 'Pune', departureTime: '17:10', arrivalTime: '20:25', duration: '3h 15m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier', isPopular: true, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 145, '3A': 480, '2A': 850 } },
  { id: '12125', trainNumber: '12125', trainName: 'Pragati Express', departureStation: 'CSMT', departureCity: 'Mumbai', arrivalStation: 'PUNE', arrivalCity: 'Pune', departureTime: '16:25', arrivalTime: '19:50', duration: '3h 25m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier', isPopular: false, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 140, '3A': 460, '2A': 820 } },
  { id: '22225', trainNumber: '22225', trainName: 'Mumbai-Pune Vande Bharat', departureStation: 'CSMT', departureCity: 'Mumbai', arrivalStation: 'PUNE', arrivalCity: 'Pune', departureTime: '06:15', arrivalTime: '09:15', duration: '3h 00m', classes: 'AC 3 Tier | AC 2 Tier', isPopular: true, runningDays: ['M','T','W','T','F','S'], fares: { '3A': 660, '2A': 1180 } },

  // MAS -> SBC
  { id: '12027', trainNumber: '12027', trainName: 'Chennai-Bengaluru Shatabdi', departureStation: 'MAS', departureCity: 'Chennai Central', arrivalStation: 'SBC', arrivalCity: 'Bengaluru Central', departureTime: '17:30', arrivalTime: '22:30', duration: '5h 00m', classes: 'AC 3 Tier | AC 2 Tier', isPopular: true, runningDays: ['M','T','W','T','F','S'], fares: { '3A': 980, '2A': 1650 } },
  { id: '12639', trainNumber: '12639', trainName: 'Brindavan Express', departureStation: 'MAS', departureCity: 'Chennai Central', arrivalStation: 'SBC', arrivalCity: 'Bengaluru Central', departureTime: '07:40', arrivalTime: '13:45', duration: '6h 05m', classes: 'Sleeper | AC 3 Tier | AC 2 Tier', isPopular: false, runningDays: ['M','T','W','T','F','S','S'], fares: { SL: 220, '3A': 750, '2A': 1150 } },

  // KOAA -> NDLS
  { id: '12301', trainNumber: '12301', trainName: 'Howrah Rajdhani Express', departureStation: 'KOAA', departureCity: 'Kolkata', arrivalStation: 'NDLS', arrivalCity: 'New Delhi', departureTime: '16:50', arrivalTime: '10:05', duration: '17h 15m', classes: 'AC 3 Tier | AC 2 Tier', isPopular: true, runningDays: ['M','T','W','T','F','S','S'], fares: { '3A': 2450, '2A': 3650 } }
];

const getMatchingTrains = (srcCode, srcCity, dstCode, dstCity, classFilter) => {
  const cleanSrcCode = (srcCode || '').trim().toUpperCase();
  const cleanDstCode = (dstCode || '').trim().toUpperCase();
  const cleanSrcCity = (srcCity || '').trim();
  const cleanDstCity = (dstCity || '').trim();

  // 1. Direct match in database
  let matches = masterTrainDatabase.filter(t => {
    const matchSrc = (cleanSrcCode && t.departureStation.toUpperCase().includes(cleanSrcCode)) || 
                     (cleanSrcCity && t.departureCity.toLowerCase().includes(cleanSrcCity.toLowerCase())) ||
                     (cleanSrcCity && cleanSrcCity.toLowerCase().includes(t.departureCity.toLowerCase()));
    const matchDst = (cleanDstCode && t.arrivalStation.toUpperCase().includes(cleanDstCode)) || 
                     (cleanDstCity && t.arrivalCity.toLowerCase().includes(cleanDstCity.toLowerCase())) ||
                     (cleanDstCity && cleanDstCity.toLowerCase().includes(t.arrivalCity.toLowerCase()));
    return matchSrc && matchDst;
  });

  // 2. Reverse route match
  if (matches.length === 0) {
    const reverseMatches = masterTrainDatabase.filter(t => {
      const matchSrc = (cleanDstCode && t.departureStation.toUpperCase().includes(cleanDstCode)) || 
                       (cleanDstCity && t.departureCity.toLowerCase().includes(cleanDstCity.toLowerCase()));
      const matchDst = (cleanSrcCode && t.arrivalStation.toUpperCase().includes(cleanSrcCode)) || 
                       (cleanSrcCity && t.arrivalCity.toLowerCase().includes(cleanSrcCity.toLowerCase()));
      return matchSrc && matchDst;
    });

    if (reverseMatches.length > 0) {
      matches = reverseMatches.map(t => ({
        ...t,
        id: `${t.id}-REV`,
        departureStation: cleanSrcCode || t.arrivalStation,
        departureCity: cleanSrcCity || t.arrivalCity,
        arrivalStation: cleanDstCode || t.departureStation,
        arrivalCity: cleanDstCity || t.departureCity
      }));
    }
  }

  // 3. Dynamic generator for custom station pairs
  if (matches.length === 0 && cleanSrcCode && cleanDstCode && cleanSrcCode !== cleanDstCode) {
    const sCity = cleanSrcCity || stationCityMap[cleanSrcCode] || cleanSrcCode;
    const dCity = cleanDstCity || stationCityMap[cleanDstCode] || cleanDstCode;

    matches = [
      {
        id: `dyn-1-${cleanSrcCode}-${cleanDstCode}`,
        trainNumber: '12401',
        trainName: `${sCity} - ${dCity} Superfast Express`,
        departureStation: cleanSrcCode,
        departureCity: sCity,
        arrivalStation: cleanDstCode,
        arrivalCity: dCity,
        departureTime: '06:30',
        arrivalTime: '14:45',
        duration: '8h 15m',
        classes: 'Sleeper | AC 3 Tier | AC 2 Tier | General',
        isPopular: true,
        runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        fares: { SL: 310, '3A': 1250, '2A': 1920 }
      },
      {
        id: `dyn-2-${cleanSrcCode}-${cleanDstCode}`,
        trainNumber: '22615',
        trainName: `${sCity} - ${dCity} Vande Bharat Express`,
        departureStation: cleanSrcCode,
        departureCity: sCity,
        arrivalStation: cleanDstCode,
        arrivalCity: dCity,
        departureTime: '15:10',
        arrivalTime: '21:30',
        duration: '6h 20m',
        classes: 'AC 3 Tier | AC 2 Tier',
        isPopular: true,
        runningDays: ['M', 'T', 'W', 'F', 'S', 'S'],
        fares: { SL: 450, '3A': 1580, '2A': 2400 }
      },
      {
        id: `dyn-3-${cleanSrcCode}-${cleanDstCode}`,
        trainNumber: '12903',
        trainName: `${sCity} - ${dCity} Sampark Kranti`,
        departureStation: cleanSrcCode,
        departureCity: sCity,
        arrivalStation: cleanDstCode,
        arrivalCity: dCity,
        departureTime: '22:15',
        arrivalTime: '07:30',
        duration: '9h 15m',
        classes: 'Sleeper | AC 3 Tier | AC 2 Tier',
        isPopular: false,
        runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        fares: { SL: 290, '3A': 1190, '2A': 1810 }
      }
    ];
  }

  // Filter by selected class if specific
  if (classFilter && classFilter !== 'all') {
    const classFiltered = matches.filter(t => t.fares && t.fares[classFilter]);
    if (classFiltered.length > 0) {
      return classFiltered;
    }
  }

  return matches;
};

const BookTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const addBooking = useBookingStore(state => state.addBooking);
  const user = useAuthStore(state => state.user);

  // Search parameters state initialized with location state if available
  const initialFrom = location.state?.fromCode || 'NDLS';
  const initialTo = location.state?.toCode || 'BSB';
  const initialDate = location.state?.journeyDate ? dayjs(location.state.journeyDate) : dayjs('2025-09-20');
  const initialClass = location.state?.travelClass || 'SL';

  const [fromCode, setFromCode] = useState(initialFrom);
  const [toCode, setToCode] = useState(initialTo);
  const [journeyDate, setJourneyDate] = useState(initialDate);
  const [selectedClassFilter, setSelectedClassFilter] = useState(initialClass);
  const [sortBy, setSortBy] = useState('departure');

  // React to location state updates
  useEffect(() => {
    if (location.state?.fromCode) setFromCode(location.state.fromCode);
    if (location.state?.toCode) setToCode(location.state.toCode);
    if (location.state?.journeyDate) setJourneyDate(dayjs(location.state.journeyDate));
    if (location.state?.travelClass) setSelectedClassFilter(location.state.travelClass);
  }, [location.state]);

  const getStationOptions = (query) => {
    const matches = searchStations(query || '');
    const list = matches.length > 0 ? matches : INDIAN_STATIONS.slice(0, 15);
    return list.map(st => ({
      value: st.code,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span><strong>{st.name}</strong> <span style={{ color: '#1890ff', fontSize: '0.8rem' }}>({st.code})</span></span>
          <span style={{ fontSize: '0.75rem', color: '#8c8c8c' }}>{st.city}, {st.state}</span>
        </div>
      )
    }));
  };

  // Selected train and class overrides
  const [selectedTrainId, setSelectedTrainId] = useState(null);
  const [selectedClassOverride, setSelectedClassOverride] = useState(null);

  // Derived station displays without code duplication
  const fromStationObj = INDIAN_STATIONS.find(s => s.code === fromCode || s.name.toUpperCase().includes(fromCode) || s.city.toUpperCase().includes(fromCode));
  const toStationObj = INDIAN_STATIONS.find(s => s.code === toCode || s.name.toUpperCase().includes(toCode) || s.city.toUpperCase().includes(toCode));

  const rawFromCity = fromStationObj ? fromStationObj.name : (stationCityMap[fromCode] || fromCode);
  const rawToCity = toStationObj ? toStationObj.name : (stationCityMap[toCode] || toCode);

  const fromCity = rawFromCity.includes(`(${fromCode})`) ? rawFromCity : `${rawFromCity} (${fromCode})`;
  const toCity = rawToCity.includes(`(${toCode})`) ? rawToCity : `${rawToCity} (${toCode})`;

  // Pure derived matching trains list with real seat availability
  const displayedTrains = useMemo(() => {
    const dateStr = journeyDate ? journeyDate.format('YYYY-MM-DD') : '2025-09-20';
    return findTrainsForRoute(fromCode, toCode, dateStr, selectedClassFilter);
  }, [fromCode, toCode, journeyDate, selectedClassFilter]);

  // Pure derived selected train and class
  const selectedTrain = useMemo(() => {
    return displayedTrains.find(t => t.id === selectedTrainId) || displayedTrains[0] || masterTrainDatabase[0];
  }, [displayedTrains, selectedTrainId]);

  const selectedClass = useMemo(() => {
    if (selectedClassOverride && (selectedTrain?.fares?.[selectedClassOverride] || selectedTrain?.fareDetails?.[selectedClassOverride])) {
      return selectedClassOverride;
    }
    if (selectedClassFilter && selectedClassFilter !== 'all' && (selectedTrain?.fares?.[selectedClassFilter] || selectedTrain?.fareDetails?.[selectedClassFilter])) {
      return selectedClassFilter;
    }
    if (selectedTrain?.fareDetails) {
      return Object.keys(selectedTrain.fareDetails)[0];
    }
    return selectedTrain?.fares ? Object.keys(selectedTrain.fares)[0] : 'SL';
  }, [selectedTrain, selectedClassFilter, selectedClassOverride]);

  const currentFare = useMemo(() => {
    if (!selectedTrain) return 385;
    if (selectedTrain.fareDetails && selectedTrain.fareDetails[selectedClass]) {
      return selectedTrain.fareDetails[selectedClass].price;
    }
    if (selectedTrain.fares && selectedTrain.fares[selectedClass]) {
      return selectedTrain.fares[selectedClass];
    }
    return 385;
  }, [selectedTrain, selectedClass]);

  const selectedSeatStatus = useMemo(() => {
    if (!selectedTrain || !selectedClass) return null;
    const dateStr = journeyDate ? journeyDate.format('YYYY-MM-DD') : '2025-09-20';
    return calculateSeatAvailability(selectedTrain.trainNumber, selectedClass, dateStr);
  }, [selectedTrain, selectedClass, journeyDate]);

  // Passenger Form State - dynamically synchronized with user profile
  const [passengerName, setPassengerName] = useState(user?.name || '');
  const [passengerAge, setPassengerAge] = useState('26');
  const [passengerGender, setPassengerGender] = useState(user?.gender || 'Male');
  const [mobileNumber, setMobileNumber] = useState(user?.phone || '');
  const [emailId, setEmailId] = useState(user?.email || '');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [agreedTerms, setAgreedTerms] = useState(true);

  useEffect(() => {
    if (user) {
      if (!passengerName) setPassengerName(user.name || '');
      if (!mobileNumber) setMobileNumber(user.phone || '');
      if (!emailId) setEmailId(user.email || '');
      if (!passengerGender) setPassengerGender(user.gender || 'Male');
    }
  }, [user]);

  // Success Modal State
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [latestBooking, setLatestBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectTrain = (train, cls) => {
    setSelectedTrainId(train.id);
    if (cls) {
      setSelectedClassOverride(cls);
    } else if (train.fares) {
      setSelectedClassOverride(Object.keys(train.fares)[0]);
    }
  };

  const handleSwapStations = () => {
    const tempCode = fromCode;
    setFromCode(toCode);
    setToCode(tempCode);
  };

  const handleProceedToPay = () => {
    if (!passengerName.trim()) {
      message.error('Please enter passenger full name');
      return;
    }
    if (!passengerAge) {
      message.error('Please enter passenger age');
      return;
    }
    if (!passengerGender) {
      message.error('Please select passenger gender');
      return;
    }
    if (!mobileNumber.trim()) {
      message.error('Please enter mobile number');
      return;
    }
    if (!agreedTerms) {
      message.error('Please agree to the Terms & Conditions');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const classNameFull = selectedClass === 'SL' ? 'Sleeper (SL)' : selectedClass === '3A' ? 'AC 3 Tier (3A)' : 'AC 2 Tier (2A)';
      const bookingData = {
        trainName: selectedTrain.trainName,
        trainNumber: selectedTrain.trainNumber,
        source: `${fromCity} (${fromCode})`,
        destination: `${toCity} (${toCode})`,
        journeyDate: journeyDate ? journeyDate.format('DD MMM YYYY') : '20 Sep 2025',
        journeyTime: selectedTrain.departureTime,
        className: classNameFull,
        totalFare: currentFare,
        passengerName,
        passengerAge,
        passengerGender,
        mobileNumber
      };

      const newBooking = addBooking(bookingData);
      setLatestBooking(newBooking);
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 600);
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* Main Grid: Left 16 cols (approx 68%), Right 8 cols (approx 32%) */}
      <Row gutter={[24, 24]}>
        
        {/* LEFT COLUMN: Hero Banner, Search Bar, Train Results List, Features Footer */}
        <Col xs={24} lg={16} xl={16}>
          
          {/* HERO BANNER & SEARCH CONTROLS CONTAINER */}
          <div style={{ marginBottom: '28px' }}>
            {/* Top Banner Image Container */}
            <div style={{
              height: '150px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              marginBottom: '16px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
                alt="Train Landscape"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,25,50,0.88), rgba(0,40,90,0.65))' }}></div>
              
              <div style={{ position: 'absolute', top: '24px', left: '32px' }}>
                <Text style={{ fontSize: '0.7rem', color: '#69b1ff', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                  BOOK YOUR TRAIN TICKET
                </Text>
                <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '800', fontSize: '2rem', letterSpacing: '-0.5px' }}>
                  Travel Across India
                </Title>
                <Text style={{ color: '#e6f7ff', fontSize: '0.9rem', fontWeight: '500', marginTop: '4px', display: 'block' }}>
                  Comfortable &bull; Safe &bull; Affordable
                </Text>
              </div>
            </div>

            {/* SEARCH CONTROLS CARD */}
            <Card 
              bordered={false} 
              style={{ 
                borderRadius: '16px', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                backgroundColor: '#ffffff',
                border: '1px solid #e8e8e8'
              }}
              bodyStyle={{ padding: '20px 24px' }}
            >
              <Row gutter={[16, 16]} align="top">
                {/* From Station */}
                <Col xs={24} sm={12} md={6} lg={6}>
                  <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '6px', fontWeight: '600' }}>From</div>
                  <AutoComplete
                    value={fromCode}
                    onChange={(v) => setFromCode(v.toUpperCase())}
                    options={getStationOptions(fromCode)}
                    placeholder="Departure Station (e.g. PNBE, Patna)"
                    style={{ width: '100%', height: '42px' }}
                  />
                  <Text style={{ fontSize: '0.72rem', color: '#1890ff', marginLeft: '2px', display: 'block', marginTop: '4px', fontWeight: '600', whiteSpace: 'nowrap' }}>{fromCity}</Text>
                </Col>

                {/* Swap Button */}
                <Col xs={24} sm={2} md={1} lg={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '26px' }}>
                  <div 
                    onClick={handleSwapStations}
                    title="Swap Stations"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#e6f0ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#0d47a1',
                      transition: 'all 0.2s ease',
                      border: '1px solid #bae0ff'
                    }}
                  >
                    <SwapOutlined style={{ fontSize: '14px' }} />
                  </div>
                </Col>

                {/* To Station */}
                <Col xs={24} sm={10} md={5} lg={5}>
                  <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '6px', fontWeight: '600' }}>To</div>
                  <AutoComplete
                    value={toCode}
                    onChange={(v) => setToCode(v.toUpperCase())}
                    options={getStationOptions(toCode)}
                    placeholder="Destination Station (e.g. NDLS, Delhi)"
                    style={{ width: '100%', height: '42px' }}
                  />
                  <Text style={{ fontSize: '0.72rem', color: '#1890ff', marginLeft: '2px', display: 'block', marginTop: '4px', fontWeight: '600', whiteSpace: 'nowrap' }}>{toCity}</Text>
                </Col>

                {/* Date of Journey */}
                <Col xs={24} sm={12} md={6} lg={6}>
                  <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '6px', fontWeight: '600' }}>Date of Journey</div>
                  <DatePicker 
                    value={journeyDate}
                    onChange={(d) => setJourneyDate(d)}
                    format="DD MMM YYYY"
                    style={{ width: '100%', borderRadius: '8px', height: '42px', fontWeight: '600', backgroundColor: '#f8fafc' }}
                  />
                </Col>

                {/* Class */}
                <Col xs={24} sm={12} md={6} lg={6}>
                  <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '6px', fontWeight: '600' }}>Class</div>
                  <Select 
                    value={selectedClassFilter}
                    onChange={(v) => setSelectedClassFilter(v)}
                    style={{ width: '100%', height: '42px' }}
                    options={[
                      { value: 'all', label: 'All Classes' },
                      { value: 'SL', label: 'Sleeper (SL)' },
                      { value: '3A', label: 'AC 3 Tier (3A)' },
                      { value: '2A', label: 'AC 2 Tier (2A)' }
                    ]}
                  />
                </Col>
              </Row>

              {/* Bottom Action Row: Search Trains Button on Right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button 
                  type="primary"
                  onClick={() => message.success(`Found ${displayedTrains.length} available trains for ${fromCity} to ${toCity}`)}
                  icon={<SearchOutlined />}
                  style={{
                    borderRadius: '8px',
                    height: '42px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    backgroundColor: '#1890ff',
                    padding: '0 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.25)'
                  }}
                >
                  Search Trains
                </Button>
              </div>
            </Card>
          </div>

          {/* TRAIN RESULTS SECTION HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', padding: '0 4px', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <Title level={4} style={{ margin: 0, fontWeight: '800', color: '#00234b', fontSize: '1.15rem', lineHeight: 1.3 }}>
                Trains from {fromCity} to {toCity} - {journeyDate ? journeyDate.format('DD MMM YYYY') : '20 Sep 2025'}
              </Title>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <Text style={{ fontSize: '0.85rem', color: '#595959', fontWeight: '600', whiteSpace: 'nowrap' }}>
                {displayedTrains.length} Trains Found
              </Text>
              <Select 
                value={sortBy} 
                onChange={(v) => setSortBy(v)}
                size="middle" 
                style={{ width: '210px' }}
                options={[
                  { value: 'departure', label: 'Sort by: Departure Time' }, 
                  { value: 'duration', label: 'Sort by: Duration' },
                  { value: 'fare', label: 'Sort by: Lowest Fare' }
                ]}
              />
            </div>
          </div>

          {/* TRAINS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
            {displayedTrains.length > 0 ? (
              [...displayedTrains]
                .sort((a, b) => {
                  if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
                  if (sortBy === 'fare') {
                    const minA = Math.min(...Object.values(a.fares || { 0: 9999 }));
                    const minB = Math.min(...Object.values(b.fares || { 0: 9999 }));
                    return minA - minB;
                  }
                  return (a.departureTime || '').localeCompare(b.departureTime || '');
                })
                .map((train) => {
                  const isCurrentTrainSelected = selectedTrain?.id === train.id;

                  return (
                    <Card
                      key={train.id}
                      bordered={false}
                      onClick={() => handleSelectTrain(train)}
                      style={{
                        borderRadius: '16px',
                        boxShadow: isCurrentTrainSelected ? '0 4px 20px rgba(24, 144, 255, 0.16)' : '0 2px 10px rgba(0,0,0,0.03)',
                        border: isCurrentTrainSelected ? '2px solid #1890ff' : '1px solid #e8e8e8',
                        transition: 'all 0.2s ease',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer'
                      }}
                      bodyStyle={{ padding: '20px' }}
                    >
                      {/* Card Header: Icon, Train Name/Number, Tags & Running Days */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ background: isCurrentTrainSelected ? '#e6f0ff' : '#f0f5ff', padding: '10px', borderRadius: '12px', color: '#1890ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Train size={22} />
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Text style={{ fontSize: '1.05rem', color: '#00234b', fontWeight: '800' }}>
                                {train.trainName} ({train.trainNumber})
                              </Text>
                              {train.isPopular && (
                                <Tag color="green" style={{ border: 'none', borderRadius: '4px', fontWeight: '700', fontSize: '0.7rem', padding: '0 8px' }}>
                                  Popular
                                </Tag>
                              )}
                              {isCurrentTrainSelected && (
                                <Tag color="blue" style={{ border: 'none', borderRadius: '4px', fontWeight: '700', fontSize: '0.7rem', padding: '0 8px' }}>
                                  Selected
                                </Tag>
                              )}
                            </div>
                            <Text style={{ fontSize: '0.75rem', color: '#8c8c8c', display: 'block', marginTop: '2px' }}>
                              {train.classes}
                            </Text>
                          </div>
                        </div>

                        {/* Running Days */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f8fafc', padding: '6px 12px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                          <Text style={{ fontSize: '0.7rem', color: '#8c8c8c', marginRight: '4px', fontWeight: '500' }}>Runs On:</Text>
                          {train.runningDays.map((day, idx) => (
                            <span key={idx} style={{ fontSize: '0.7rem', fontWeight: '700', color: '#0d47a1', padding: '0 2px' }}>
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Middle: Timings & Route */}
                      <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '14px 20px', marginBottom: '16px' }}>
                        <Row align="middle" justify="space-between">
                          {/* Departure */}
                          <Col span={7}>
                            <Text style={{ fontSize: '1.3rem', color: '#00234b', fontWeight: '800', display: 'block', lineHeight: 1.1 }}>
                              {train.departureTime}
                            </Text>
                            <Text style={{ fontSize: '0.85rem', color: '#262626', fontWeight: '700', display: 'block', marginTop: '3px' }}>
                              {train.departureCity} ({train.departureStation})
                            </Text>
                          </Col>

                          {/* Duration Indicator */}
                          <Col span={10} style={{ textAlign: 'center' }}>
                            <Text style={{ fontSize: '0.75rem', color: '#8c8c8c', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                              {train.duration}
                            </Text>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1890ff' }} />
                              <div style={{ flex: 1, height: '1px', backgroundColor: '#bae0ff' }} />
                              <ArrowRight size={14} color="#1890ff" />
                              <div style={{ flex: 1, height: '1px', backgroundColor: '#bae0ff' }} />
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1890ff' }} />
                            </div>
                          </Col>

                          {/* Arrival */}
                          <Col span={7} style={{ textAlign: 'right' }}>
                            <Text style={{ fontSize: '1.3rem', color: '#00234b', fontWeight: '800', display: 'block', lineHeight: 1.1 }}>
                              {train.arrivalTime}
                            </Text>
                            <Text style={{ fontSize: '0.85rem', color: '#262626', fontWeight: '700', display: 'block', marginTop: '3px' }}>
                              {train.arrivalCity} ({train.arrivalStation})
                            </Text>
                          </Col>
                        </Row>
                      </div>

                      {/* Card Bottom: Class Fare Option Pills & Book Button */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Text style={{ fontSize: '0.8rem', color: '#8c8c8c', fontWeight: '600', marginRight: '2px' }}>Fares & Seats:</Text>
                          {(train.fareDetails ? Object.entries(train.fareDetails) : Object.entries(train.fares || {}).map(([k, v]) => [k, { price: v, availability: calculateSeatAvailability(train.trainNumber, k, journeyDate ? journeyDate.format('YYYY-MM-DD') : '2025-09-20') }])).map(([cls, details]) => {
                            const isSelected = isCurrentTrainSelected && selectedClass === cls;
                            const price = details.price || details;
                            const avail = details.availability || calculateSeatAvailability(train.trainNumber, cls, journeyDate ? journeyDate.format('YYYY-MM-DD') : '2025-09-20');

                            return (
                              <div
                                key={cls}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectTrain(train, cls);
                                }}
                                style={{
                                  padding: '8px 12px',
                                  borderRadius: '10px',
                                  border: isSelected ? '2px solid #1890ff' : '1px solid #e8e8e8',
                                  backgroundColor: isSelected ? '#e6f7ff' : '#ffffff',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  minWidth: '105px',
                                  whiteSpace: 'nowrap',
                                  transition: 'all 0.2s ease',
                                  boxShadow: isSelected ? '0 2px 8px rgba(24, 144, 255, 0.15)' : 'none'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px', alignItems: 'center' }}>
                                  <Text style={{ fontSize: '0.75rem', color: isSelected ? '#1890ff' : '#595959', fontWeight: '700', lineHeight: 1.2 }}>
                                    {cls}
                                  </Text>
                                  <Text style={{ fontSize: '0.85rem', color: isSelected ? '#1890ff' : '#00234b', fontWeight: '800', lineHeight: 1.2 }}>
                                    ₹ {price}
                                  </Text>
                                </div>
                                <div style={{ 
                                  fontSize: '0.65rem', 
                                  fontWeight: '700', 
                                  marginTop: '4px',
                                  padding: '2px 4px', 
                                  borderRadius: '4px',
                                  backgroundColor: avail.badgeBg || '#e6f4ea',
                                  color: avail.badgeText || '#137333',
                                  border: `1px solid ${avail.badgeText}33`
                                }}>
                                  {avail.text}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Book Now Button */}
                        <Button
                          type="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTrain(train);
                          }}
                          style={{
                            borderRadius: '10px',
                            height: '42px',
                            padding: '0 24px',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            backgroundColor: isCurrentTrainSelected ? '#0d47a1' : '#1890ff',
                            boxShadow: '0 4px 12px rgba(24, 144, 255, 0.25)'
                          }}
                        >
                          {isCurrentTrainSelected ? '✓ Selected' : 'Book Now'}
                        </Button>
                      </div>
                    </Card>
                  );
                })
            ) : (
              <Card style={{ textAlign: 'center', padding: '40px 20px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px dashed #d9d9d9' }}>
                <Train size={48} color="#bfbfbf" style={{ marginBottom: '12px' }} />
                <Title level={4} style={{ color: '#00234b', margin: 0 }}>No Trains Found for this Route</Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginTop: '6px', marginBottom: '20px' }}>
                  No direct trains found matching {fromCode} to {toCode}. Try searching for NDLS to BSB, CSMT to PUNE, or MAS to SBC.
                </Text>
                <Button type="primary" onClick={() => {
                  handleFromChange('NDLS');
                  handleToChange('BSB');
                  handleClassFilterChange('SL');
                }}>
                  Reset Search (NDLS - BSB)
                </Button>
              </Card>
            )}
          </div>

          {/* BOTTOM FEATURES FOOTER BAR */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', backgroundColor: '#f8fafc', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
            bodyStyle={{ padding: '20px 24px' }}
          >
            <Row gutter={16}>
              <Col span={6} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#e6f0ff', padding: '10px', borderRadius: '50%', color: '#1890ff' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <Text style={{ fontWeight: '700', fontSize: '0.85rem', color: '#00234b', display: 'block' }}>100% Secure Payments</Text>
                  <Text style={{ fontSize: '0.72rem', color: '#8c8c8c' }}>Your data is safe with us</Text>
                </div>
              </Col>

              <Col span={6} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#e6f0ff', padding: '10px', borderRadius: '50%', color: '#1890ff' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <Text style={{ fontWeight: '700', fontSize: '0.85rem', color: '#00234b', display: 'block' }}>Instant Booking</Text>
                  <Text style={{ fontSize: '0.72rem', color: '#8c8c8c' }}>Quick & hassle-free</Text>
                </div>
              </Col>

              <Col span={6} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#e6f0ff', padding: '10px', borderRadius: '50%', color: '#1890ff' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <Text style={{ fontWeight: '700', fontSize: '0.85rem', color: '#00234b', display: 'block' }}>PNR Status</Text>
                  <Text style={{ fontSize: '0.72rem', color: '#8c8c8c' }}>Check your booking status</Text>
                </div>
              </Col>

              <Col span={6} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#e6f0ff', padding: '10px', borderRadius: '50%', color: '#1890ff' }}>
                  <HelpCircle size={20} />
                </div>
                <div>
                  <Text style={{ fontWeight: '700', fontSize: '0.85rem', color: '#00234b', display: 'block' }}>24/7 Support</Text>
                  <Text style={{ fontSize: '0.72rem', color: '#8c8c8c' }}>We are always here to help</Text>
                </div>
              </Col>
            </Row>
          </Card>

        </Col>


        {/* RIGHT PANEL: Selected Train Details, Fare Summary, Passenger Details, Contact, Payment Method */}
        <Col xs={24} lg={8} xl={8}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 1. SELECTED TRAIN DETAILS CARD */}
            <Card 
              bordered={false} 
              style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              bodyStyle={{ padding: '20px' }}
            >
              <Title level={5} style={{ margin: 0, marginBottom: '14px', fontWeight: '800', color: '#00234b' }}>
                Selected Train Details
              </Title>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ width: '56px', height: '40px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#e6f0ff' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Train" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', color: '#00234b', fontSize: '0.95rem', display: 'block' }}>
                    {selectedTrain.trainNumber} - {selectedTrain.trainName}
                  </Text>
                  <Text style={{ fontSize: '0.72rem', color: '#8c8c8c' }}>
                    {selectedTrain.classes}
                  </Text>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '14px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <Text style={{ fontWeight: '800', color: '#00234b', fontSize: '0.9rem' }}>{selectedTrain.departureStation}</Text>
                    <Text style={{ fontSize: '0.7rem', color: '#8c8c8c', display: 'block' }}>{selectedTrain.departureCity}</Text>
                  </div>
                  <ArrowRight size={16} color="#1890ff" />
                  <div style={{ textAlign: 'right' }}>
                    <Text style={{ fontWeight: '800', color: '#00234b', fontSize: '0.9rem' }}>{selectedTrain.arrivalStation}</Text>
                    <Text style={{ fontSize: '0.7rem', color: '#8c8c8c', display: 'block' }}>{selectedTrain.arrivalCity}</Text>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <Text style={{ fontWeight: '800', color: '#00234b', fontSize: '1.1rem' }}>{selectedTrain.departureTime}</Text>
                  <Text style={{ fontSize: '0.75rem', color: '#8c8c8c', fontWeight: '600' }}>⏱️ {selectedTrain.duration}</Text>
                  <Text style={{ fontWeight: '800', color: '#00234b', fontSize: '1.1rem' }}>{selectedTrain.arrivalTime}</Text>
                </div>
                <Text style={{ fontSize: '0.75rem', color: '#595959', display: 'block', marginTop: '8px', fontWeight: '500' }}>
                  📅 {journeyDate ? journeyDate.format('DD MMM YYYY') : '20 Sep 2025'}
                </Text>

                {selectedSeatStatus && (
                  <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '8px', backgroundColor: selectedSeatStatus.badgeBg, border: `1px solid ${selectedSeatStatus.badgeText}44`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: '0.75rem', fontWeight: '700', color: selectedSeatStatus.badgeText }}>
                      Seat Status ({selectedClass}):
                    </Text>
                    <Tag color={selectedSeatStatus.color} style={{ margin: 0, fontWeight: '800' }}>
                      {selectedSeatStatus.text}
                    </Tag>
                  </div>
                )}
              </div>
            </Card>


            {/* 2. FARE SUMMARY CARD */}
            <Card 
              bordered={false} 
              style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              bodyStyle={{ padding: '20px' }}
            >
              <Title level={5} style={{ margin: 0, marginBottom: '14px', fontWeight: '800', color: '#00234b' }}>
                Fare Summary
              </Title>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ color: '#595959', fontSize: '0.9rem', fontWeight: '600' }}>1 Passenger ({selectedClass})</Text>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Text style={{ color: '#8c8c8c', fontSize: '0.85rem' }}>
                  Base Ticket Fare
                </Text>
                <Text style={{ fontWeight: '700', color: '#262626', fontSize: '0.9rem' }}>₹ {currentFare}</Text>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#00234b', fontWeight: '800', fontSize: '1.05rem' }}>Total Fare</Text>
                <Text style={{ color: '#1890ff', fontWeight: '800', fontSize: '1.5rem' }}>₹ {currentFare}</Text>
              </div>
            </Card>


            {/* 3. PASSENGER DETAILS FORM CARD */}
            <Card 
              bordered={false} 
              style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <User size={18} color="#1890ff" />
                <Title level={5} style={{ margin: 0, fontWeight: '800', color: '#00234b' }}>
                  Passenger Details
                </Title>
              </div>
              <Text style={{ fontSize: '0.75rem', color: '#8c8c8c', display: 'block', marginBottom: '16px' }}>
                Please enter the details as per your ID proof
              </Text>

              <div style={{ marginBottom: '14px' }}>
                <Text style={{ fontSize: '0.8rem', color: '#262626', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Name *
                </Text>
                <Input 
                  placeholder="Enter full name" 
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  style={{ borderRadius: '8px', height: '40px' }}
                />
              </div>

              <Row gutter={12}>
                <Col span={12}>
                  <Text style={{ fontSize: '0.8rem', color: '#262626', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Age *
                  </Text>
                  <Input 
                    type="number"
                    placeholder="Enter age" 
                    value={passengerAge}
                    onChange={(e) => setPassengerAge(e.target.value)}
                    style={{ borderRadius: '8px', height: '40px' }}
                  />
                </Col>

                <Col span={12}>
                  <Text style={{ fontSize: '0.8rem', color: '#262626', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Gender *
                  </Text>
                  <Select 
                    placeholder="Select gender" 
                    value={passengerGender}
                    onChange={(v) => setPassengerGender(v)}
                    style={{ width: '100%', height: '40px' }}
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Transgender', label: 'Transgender' }
                    ]}
                  />
                </Col>
              </Row>
            </Card>


            {/* 4. CONTACT DETAILS CARD */}
            <Card 
              bordered={false} 
              style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Phone size={18} color="#1890ff" />
                <Title level={5} style={{ margin: 0, fontWeight: '800', color: '#00234b' }}>
                  Contact Details
                </Title>
              </div>

              <Row gutter={12}>
                <Col span={12}>
                  <Text style={{ fontSize: '0.8rem', color: '#262626', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Mobile Number *
                  </Text>
                  <Input 
                    placeholder="Enter mobile number" 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    style={{ borderRadius: '8px', height: '40px' }}
                  />
                </Col>

                <Col span={12}>
                  <Text style={{ fontSize: '0.8rem', color: '#262626', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Email ID (Optional)
                  </Text>
                  <Input 
                    placeholder="Enter email address" 
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    style={{ borderRadius: '8px', height: '40px' }}
                  />
                </Col>
              </Row>
            </Card>


            {/* 5. PAYMENT METHOD & CHECKOUT CARD */}
            <Card 
              bordered={false} 
              style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <CreditCard size={18} color="#1890ff" />
                <Title level={5} style={{ margin: 0, fontWeight: '800', color: '#00234b' }}>
                  Payment Method
                </Title>
              </div>

              <Radio.Group 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Radio value="upi" style={{ fontSize: '0.85rem', color: '#262626', fontWeight: '500' }}>
                    UPI
                  </Radio>
                  <Radio value="card" style={{ fontSize: '0.85rem', color: '#262626', fontWeight: '500' }}>
                    Credit / Debit Card
                  </Radio>
                  <Radio value="netbanking" style={{ fontSize: '0.85rem', color: '#262626', fontWeight: '500' }}>
                    Net Banking
                  </Radio>
                  <Radio value="wallets" style={{ fontSize: '0.85rem', color: '#262626', fontWeight: '500' }}>
                    Wallets
                  </Radio>
                </div>
              </Radio.Group>

              <div style={{ marginBottom: '18px' }}>
                <Checkbox 
                  checked={agreedTerms} 
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  style={{ color: '#595959', fontSize: '0.78rem' }}
                >
                  I agree to the <span style={{ color: '#1890ff' }}>Terms & Conditions</span> and <span style={{ color: '#1890ff' }}>Privacy Policy</span>
                </Checkbox>
              </div>

              <Button 
                type="primary"
                block
                loading={isSubmitting}
                onClick={handleProceedToPay}
                style={{
                  borderRadius: '10px',
                  height: '46px',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  backgroundColor: '#1890ff',
                  boxShadow: '0 4px 14px rgba(24, 144, 255, 0.3)'
                }}
              >
                Proceed to Pay ₹ {currentFare} &rarr;
              </Button>
            </Card>

          </div>
        </Col>

      </Row>

      {/* BOOKING CONFIRMATION SUCCESS MODAL */}
      <Modal
        open={isSuccessModalOpen}
        footer={null}
        onCancel={() => { setIsSuccessModalOpen(false); navigate('/'); }}
        centered
        width={500}
        style={{ borderRadius: '20px' }}
      >
        <div style={{ textAlign: 'center', padding: '20px 10px' }}>
          <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#52c41a' }}>
            <CheckCircle size={36} />
          </div>

          <Title level={3} style={{ color: '#00234b', margin: 0, fontWeight: '800' }}>
            Booking Confirmed!
          </Title>
          <Text style={{ color: '#8c8c8c', fontSize: '0.9rem', display: 'block', marginTop: '4px', marginBottom: '20px' }}>
            Your train ticket has been booked successfully
          </Text>

          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '20px', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text style={{ color: '#8c8c8c', fontSize: '0.8rem' }}>PNR Number</Text>
              <Text style={{ fontWeight: '800', color: '#1890ff', fontSize: '0.95rem' }}>{latestBooking?.pnr}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text style={{ color: '#8c8c8c', fontSize: '0.8rem' }}>Train</Text>
              <Text style={{ fontWeight: '700', color: '#262626', fontSize: '0.85rem' }}>{latestBooking?.trainName} ({latestBooking?.trainNumber})</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text style={{ color: '#8c8c8c', fontSize: '0.8rem' }}>Route</Text>
              <Text style={{ fontWeight: '600', color: '#262626', fontSize: '0.85rem' }}>{latestBooking?.source} &rarr; {latestBooking?.destination}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text style={{ color: '#8c8c8c', fontSize: '0.8rem' }}>Passenger</Text>
              <Text style={{ fontWeight: '600', color: '#262626', fontSize: '0.85rem' }}>{latestBooking?.passengerName} ({latestBooking?.passengerAge}, {latestBooking?.passengerGender})</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: '#8c8c8c', fontSize: '0.8rem' }}>Seat / Coach</Text>
              <Text style={{ fontWeight: '700', color: '#52c41a', fontSize: '0.85rem' }}>Coach {latestBooking?.coach || 'B3'}, Berth {latestBooking?.berth || '36'}</Text>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button 
                type="primary"
                style={{ flex: 1, borderRadius: '8px', fontWeight: '600' }}
                onClick={() => { setIsSuccessModalOpen(false); navigate(`/pnr?pnr=${latestBooking?.pnr}`); }}
              >
                Check PNR Status
              </Button>
              <Button 
                style={{ flex: 1, borderRadius: '8px', fontWeight: '600' }}
                onClick={() => { setIsSuccessModalOpen(false); navigate(`/live?train=${latestBooking?.trainNumber}`); }}
              >
                Track Live Status
              </Button>
            </div>
            <Button 
              type="default" 
              block
              size="large"
              onClick={() => { setIsSuccessModalOpen(false); navigate('/my-bookings'); }}
              style={{ borderRadius: '10px', height: '42px', fontWeight: '700', backgroundColor: '#f0f5ff', color: '#1890ff', border: '1px solid #adc6ff' }}
            >
              View in My Bookings
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default BookTicket;

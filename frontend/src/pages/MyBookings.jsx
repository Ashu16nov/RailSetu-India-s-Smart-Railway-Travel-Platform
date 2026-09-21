import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Tag, 
  Modal, 
  message, 
  Popconfirm,
  Tooltip
} from 'antd';
import { 
  Ticket, 
  Train, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Download, 
  XCircle, 
  CheckCircle2, 
  Info, 
  Copy, 
  ArrowRight,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const { Title, Text } = Typography;

// Mock fallback initial bookings matching uploaded screenshot precisely
const MOCK_DEFAULT_BOOKINGS = [
  {
    _id: 'bk_mock_001',
    bookingId: 'RS20250915A001',
    pnr: '2457812365',
    bookingDate: '15 Sep 2025',
    trainNumber: '12650',
    trainName: 'Kashi Express',
    source: 'New Delhi (NDLS)',
    destination: 'Varanasi Jn (BSB)',
    journeyDate: 'Tue, 16 Sep 2025',
    departureTime: '21:15 (NDLS)',
    arrivalTime: '05:30 (BSB)',
    duration: '8h 15m',
    passengersCount: '1 Adult',
    coach: 'B2',
    berth: '34 (LB)',
    className: 'Sleeper (SL)',
    status: 'CONFIRMED',
    tagText: 'Confirmed',
    tagColor: 'green',
    totalFare: 540
  },
  {
    _id: 'bk_mock_002',
    bookingId: 'RS20250828A002',
    pnr: '6423179850',
    bookingDate: '28 Aug 2025',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    source: 'New Delhi (NDLS)',
    destination: 'Mumbai CSMT (BCT)',
    journeyDate: 'Sun, 31 Aug 2025',
    departureTime: '16:25 (NDLS)',
    arrivalTime: '08:45 (BCT)',
    duration: '16h 20m',
    passengersCount: '2 Adults',
    coach: 'A1',
    berth: '12, 13 (LB)',
    className: 'AC 3 Tier (3A)',
    status: 'CHECKED_IN',
    tagText: 'Checked In',
    tagColor: 'blue',
    totalFare: 2850
  },
  {
    _id: 'bk_mock_003',
    bookingId: 'RS20250710A003',
    pnr: '2365478901',
    bookingDate: '10 Jul 2025',
    trainNumber: '12259',
    trainName: 'Duronto Express',
    source: 'Howrah (HWH)',
    destination: 'New Delhi (NDLS)',
    journeyDate: 'Thu, 18 Jul 2025',
    departureTime: '19:40 (HWH)',
    arrivalTime: '06:10 (NDLS)',
    duration: '10h 30m',
    passengersCount: '1 Adult',
    coach: 'B1',
    berth: '18 (UB)',
    className: 'AC 3 Tier (3A)',
    status: 'CANCELLED',
    tagText: 'Cancelled',
    tagColor: 'red',
    totalFare: 1620
  }
];

const MyBookings = () => {
  const navigate = useNavigate();
  const storeBookings = useBookingStore((state) => state.bookings);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);

  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [localBookings, setLocalBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    // Combine dynamic store bookings with mock fallback bookings
    const formattedStoreBookings = storeBookings.map((b) => ({
      _id: b._id,
      bookingId: b.bookingId || `RS${Date.now().toString().slice(-6)}`,
      pnr: b.pnr || Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      bookingDate: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '15 Sep 2025',
      trainNumber: b.trainNumber || '12650',
      trainName: b.trainName || 'Kashi Express',
      source: b.source || 'New Delhi (NDLS)',
      destination: b.destination || 'Varanasi Jn (BSB)',
      journeyDate: b.journeyDate || 'Tue, 16 Sep 2025',
      departureTime: b.journeyTime ? `${b.journeyTime} (NDLS)` : '21:15 (NDLS)',
      arrivalTime: '05:30 (BSB)',
      duration: '8h 15m',
      passengersCount: Array.isArray(b.passengers) ? `${b.passengers.length} Passenger(s)` : '1 Adult',
      coach: b.coach || 'B2',
      berth: b.berth ? `${b.berth}` : '34 (LB)',
      className: b.className || 'Sleeper (SL)',
      status: b.status || 'CONFIRMED',
      tagText: b.status === 'CANCELLED' || b.status === 'CANCELED' ? 'Cancelled' : 'Confirmed',
      tagColor: b.status === 'CANCELLED' || b.status === 'CANCELED' ? 'red' : 'green',
      totalFare: b.totalFare || 1450
    }));

    // Avoid duplicate IDs
    const storeIds = new Set(formattedStoreBookings.map((b) => b._id));
    const uniqueMocks = MOCK_DEFAULT_BOOKINGS.filter((m) => !storeIds.has(m._id));
    setLocalBookings([...formattedStoreBookings, ...uniqueMocks]);
  }, [storeBookings]);

  const handleCopyPNR = (pnr) => {
    navigator.clipboard.writeText(pnr);
    message.success(`PNR ${pnr} copied to clipboard!`);
  };

  const handleViewTicket = (booking) => {
    setSelectedTicket(booking);
    setTicketModalVisible(true);
  };

  const handleDownloadTicket = (booking) => {
    message.loading({ content: 'Generating e-Ticket PDF...', key: 'dl' });
    setTimeout(() => {
      message.success({ content: `Ticket downloaded for PNR ${booking.pnr}`, key: 'dl' });
    }, 1200);
  };

  const handleCancelBooking = (bookingId) => {
    if (cancelBooking) cancelBooking(bookingId);
    setLocalBookings((prev) =>
      prev.map((b) =>
        b._id === bookingId || b.bookingId === bookingId
          ? { ...b, status: 'CANCELLED', tagText: 'Cancelled', tagColor: 'red' }
          : b
      )
    );
    message.info('Booking cancelled. Refund request initiated!');
  };

  // Filter bookings based on active sub-tab
  const filteredBookings = localBookings.filter((b) => {
    if (activeTab === 'upcoming') {
      return b.status === 'CONFIRMED' || b.status === 'CHECKED_IN';
    }
    if (activeTab === 'past') {
      return b.status === 'COMPLETED' || b.status === 'CHECKED_IN';
    }
    if (activeTab === 'cancelled') {
      return b.status === 'CANCELLED' || b.status === 'CANCELED';
    }
    return true; // PNR Status tab shows all
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* 1. Header Hero Banner Card */}
      <div 
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          background: '#0d1b2a'
        }}
      >
        <div style={{ height: '140px', position: 'relative' }}>
          <img 
            src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
            alt="My Bookings Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(13,27,42,0.95) 0%, rgba(13,27,42,0.6) 60%, rgba(13,27,42,0.9) 100%)'
          }} />
        </div>

        <div 
          style={{
            position: 'absolute',
            inset: 0,
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            zIndex: 2
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Ticket size={32} color="#ffffff" />
          </div>
          <div>
            <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>
              My Bookings
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
              View and manage your train ticket bookings, PNR status and travel history.
            </Text>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs Navigation Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { key: 'upcoming', label: 'Upcoming Bookings', icon: <Ticket size={16} /> },
          { key: 'past', label: 'Past Bookings', icon: <Calendar size={16} /> },
          { key: 'cancelled', label: 'Cancelled', icon: <XCircle size={16} /> },
          { key: 'pnr', label: 'PNR Status', icon: <Search size={16} />, action: () => navigate('/pnr') }
        ].map((tab) => (
          <Button 
            key={tab.key}
            type={activeTab === tab.key ? 'primary' : 'default'}
            icon={tab.icon}
            onClick={() => tab.action ? tab.action() : setActiveTab(tab.key)}
            style={{
              borderRadius: '12px',
              fontWeight: '700',
              height: '44px',
              padding: '0 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: activeTab === tab.key ? '#1890ff' : '#ffffff',
              boxShadow: activeTab === tab.key ? '0 4px 14px rgba(24,144,255,0.3)' : 'none'
            }}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* 3. Bookings List Container */}
      <Row gutter={[0, 20]}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const isCancelled = booking.status === 'CANCELLED' || booking.status === 'CANCELED';
            return (
              <Col span={24} key={booking._id}>
                <Card 
                  bordered={false} 
                  style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden' }}
                  bodyStyle={{ padding: '24px' }}
                >
                  {/* Top Status & Booking ID Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Tag 
                      color={booking.tagColor || (isCancelled ? 'red' : 'green')}
                      style={{
                        borderRadius: '12px',
                        padding: '3px 12px',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        border: 'none',
                        backgroundColor: isCancelled ? '#fff2e8' : (booking.status === 'CHECKED_IN' ? '#e6f7ff' : '#e6f4ea'),
                        color: isCancelled ? '#d4380d' : (booking.status === 'CHECKED_IN' ? '#1890ff' : '#137333'),
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isCancelled ? <XCircle size={14} /> : <CheckCircle2 size={14} />} {booking.tagText}
                    </Tag>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Text type="secondary" style={{ fontSize: '0.82rem' }}>Booking ID:</Text>
                      <Text strong style={{ fontSize: '0.88rem', color: '#1e293b' }}>{booking.bookingId}</Text>
                      <Tooltip title="Copy Booking ID">
                        <Copy 
                          size={14} 
                          color="#94a3b8" 
                          style={{ cursor: 'pointer', marginLeft: '4px' }}
                          onClick={() => handleCopyPNR(booking.bookingId)}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  {/* Train Name, Route & PNR Details Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div 
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          backgroundColor: '#e3f2fd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Train size={24} color="#0d47a1" />
                      </div>
                      <div>
                        <Title level={4} style={{ margin: 0, fontWeight: '800', color: '#1e293b', lineHeight: 1.2 }}>
                          {booking.trainNumber} - {booking.trainName}
                        </Title>
                        <Text style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '500' }}>
                          {booking.source} → {booking.destination}
                        </Text>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                        <Text type="secondary" style={{ fontSize: '0.82rem' }}>PNR:</Text>
                        <Text strong style={{ fontSize: '1rem', color: '#1e293b' }}>{booking.pnr}</Text>
                      </div>
                      <Text type="secondary" style={{ fontSize: '0.78rem' }}>
                        Booking Date: {booking.bookingDate}
                      </Text>
                    </div>
                  </div>

                  {/* Journey Schedule Info Bar */}
                  <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '16px 20px', marginBottom: '16px', border: '1px solid #f1f5f9' }}>
                    <Row gutter={[20, 12]} align="middle">
                      <Col xs={12} sm={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={18} color="#1890ff" />
                          <div>
                            <Text type="secondary" style={{ fontSize: '0.74rem', display: 'block' }}>Journey Date</Text>
                            <Text strong style={{ fontSize: '0.92rem', color: '#1e293b' }}>{booking.journeyDate}</Text>
                          </div>
                        </div>
                      </Col>

                      <Col xs={12} sm={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={18} color="#64748b" />
                          <div>
                            <Text type="secondary" style={{ fontSize: '0.74rem', display: 'block' }}>Departure</Text>
                            <Text strong style={{ fontSize: '0.92rem', color: '#1e293b' }}>{booking.departureTime}</Text>
                          </div>
                        </div>
                      </Col>

                      <Col xs={12} sm={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={18} color="#64748b" />
                          <div>
                            <Text type="secondary" style={{ fontSize: '0.74rem', display: 'block' }}>Arrival</Text>
                            <Text strong style={{ fontSize: '0.92rem', color: '#1e293b' }}>{booking.arrivalTime}</Text>
                          </div>
                        </div>
                      </Col>

                      <Col xs={12} sm={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={18} color="#64748b" />
                          <div>
                            <Text type="secondary" style={{ fontSize: '0.74rem', display: 'block' }}>Travel Duration</Text>
                            <Text strong style={{ fontSize: '0.92rem', color: '#1e293b' }}>{booking.duration}</Text>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Passengers & Seat Grid */}
                  <Row gutter={[16, 12]} style={{ marginBottom: '20px', padding: '0 4px' }}>
                    <Col xs={12} sm={6}>
                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Passenger(s)</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={16} color="#0d47a1" />
                        <Text strong style={{ fontSize: '0.9rem', color: '#334155' }}>{booking.passengersCount}</Text>
                      </div>
                    </Col>

                    <Col xs={12} sm={6}>
                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Coach</Text>
                      <Text strong style={{ fontSize: '0.9rem', color: '#334155' }}>{booking.coach}</Text>
                    </Col>

                    <Col xs={12} sm={6}>
                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Berth</Text>
                      <Text strong style={{ fontSize: '0.9rem', color: '#334155' }}>{booking.berth}</Text>
                    </Col>

                    <Col xs={12} sm={6}>
                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Class</Text>
                      <Text strong style={{ fontSize: '0.9rem', color: '#334155' }}>{booking.className}</Text>
                    </Col>
                  </Row>

                  {/* Actions / Cancellation Red Banner */}
                  {isCancelled ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div 
                        style={{
                          backgroundColor: '#fff2e8',
                          border: '1px solid #ffbb96',
                          borderRadius: '12px',
                          padding: '12px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <Info size={18} color="#ff4d4f" />
                        <Text style={{ color: '#d4380d', fontSize: '0.85rem' }}>
                          This booking has been cancelled. Refund has been processed to your original payment method.
                        </Text>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button
                          type="primary"
                          ghost
                          onClick={() => navigate('/book', { state: { search: booking.source } })}
                          style={{ borderRadius: '8px', fontWeight: '600' }}
                        >
                          Book Again
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '8px', alignItems: 'center' }}>
                      <Button 
                        type="primary" 
                        icon={<Eye size={16} />}
                        onClick={() => handleViewTicket(booking)}
                        style={{
                          borderRadius: '10px',
                          fontWeight: '700',
                          backgroundColor: '#1890ff',
                          padding: '0 20px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        View Ticket
                      </Button>

                      <Button 
                        icon={<Search size={16} />}
                        onClick={() => navigate(`/pnr?pnr=${booking.pnr}`)}
                        style={{
                          borderRadius: '10px',
                          fontWeight: '600',
                          padding: '0 16px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        PNR Status
                      </Button>

                      <Button 
                        icon={<Train size={16} />}
                        onClick={() => navigate(`/live?train=${booking.trainNumber}`)}
                        style={{
                          borderRadius: '10px',
                          fontWeight: '600',
                          padding: '0 16px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Live Status
                      </Button>

                      <Button 
                        icon={<Download size={16} />}
                        onClick={() => handleDownloadTicket(booking)}
                        style={{
                          borderRadius: '10px',
                          fontWeight: '600',
                          padding: '0 16px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Download
                      </Button>

                      <Popconfirm
                        title="Cancel Booking"
                        description="Are you sure you want to cancel this ticket booking?"
                        onConfirm={() => handleCancelBooking(booking._id || booking.pnr)}
                        okText="Yes, Cancel"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                      >
                        <Button 
                          danger 
                          icon={<XCircle size={16} />}
                          style={{
                            borderRadius: '10px',
                            fontWeight: '600',
                            padding: '0 16px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginLeft: 'auto'
                          }}
                        >
                          Cancel
                        </Button>
                      </Popconfirm>
                    </div>
                  )}
                </Card>
              </Col>
            );
          })
        ) : (
          <Col span={24}>
            <Card style={{ borderRadius: '20px', textAlign: 'center', padding: '60px 20px' }}>
              <Ticket size={48} color="#94a3b8" style={{ marginBottom: '12px' }} />
              <Title level={4} style={{ margin: '0 0 6px 0', color: '#1e293b' }}>No Bookings Found</Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
                You have no bookings matching the selected category.
              </Text>
              <Button type="primary" onClick={() => navigate('/book')} style={{ borderRadius: '8px', fontWeight: '600' }}>
                Book a Ticket Now
              </Button>
            </Card>
          </Col>
        )}
      </Row>

      {/* Ticket View Modal */}
      {selectedTicket && (
        <Modal
          title={null}
          open={ticketModalVisible}
          onCancel={() => setTicketModalVisible(false)}
          footer={null}
          width={650}
          style={{ borderRadius: '20px', overflow: 'hidden' }}
        >
          <div style={{ padding: '10px' }}>
            {/* e-Ticket Header */}
            <div style={{ backgroundColor: '#0d1b2a', color: '#ffffff', padding: '20px', borderRadius: '14px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Train size={30} color="#1890ff" />
                <div>
                  <Title level={4} style={{ color: '#fff', margin: 0, fontWeight: '800' }}>
                    Rail<span style={{ color: '#FB792B' }}>Setu</span> e-Ticket
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>INDIAN RAILWAY PASSENGER RESERVATION</Text>
                </div>
              </div>
              <Tag color="green" style={{ borderRadius: '8px', fontWeight: '700', padding: '4px 12px', fontSize: '0.85rem' }}>
                PNR: {selectedTicket.pnr}
              </Tag>
            </div>

            {/* Ticket Journey Details */}
            <Card style={{ borderRadius: '14px', backgroundColor: '#f8fafc', marginBottom: '16px' }}>
              <Row gutter={[16, 12]}>
                <Col span={12}><Text type="secondary">Train:</Text> <Text strong>{selectedTicket.trainNumber} - {selectedTicket.trainName}</Text></Col>
                <Col span={12}><Text type="secondary">Class:</Text> <Text strong>{selectedTicket.className}</Text></Col>
                <Col span={12}><Text type="secondary">From:</Text> <Text strong>{selectedTicket.source}</Text></Col>
                <Col span={12}><Text type="secondary">To:</Text> <Text strong>{selectedTicket.destination}</Text></Col>
                <Col span={12}><Text type="secondary">Date:</Text> <Text strong>{selectedTicket.journeyDate}</Text></Col>
                <Col span={12}><Text type="secondary">Departure Time:</Text> <Text strong>{selectedTicket.departureTime}</Text></Col>
                <Col span={12}><Text type="secondary">Coach / Berth:</Text> <Text strong>{selectedTicket.coach} / {selectedTicket.berth}</Text></Col>
                <Col span={12}><Text type="secondary">Total Fare:</Text> <Text strong style={{ color: '#1890ff' }}>₹{selectedTicket.totalFare}</Text></Col>
              </Row>
            </Card>

            {/* Simulated Barcode */}
            <div style={{ textAlign: 'center', padding: '16px', border: '1px dashed #cbd5e1', borderRadius: '12px', marginBottom: '20px', backgroundColor: '#fff' }}>
              <div style={{ height: '40px', background: 'repeating-linear-gradient(90deg, #000 0, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 8px)', margin: '0 auto 8px', maxWidth: '300px' }} />
              <Text type="secondary" style={{ fontSize: '0.75rem' }}>Scan at boarding gate or showing to TTE</Text>
            </div>

            {/* Modal Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button icon={<Printer size={16} />} onClick={() => window.print()} style={{ borderRadius: '8px' }}>
                Print
              </Button>
              <Button type="primary" onClick={() => handleDownloadTicket(selectedTicket)} style={{ borderRadius: '8px' }}>
                Download PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default MyBookings;

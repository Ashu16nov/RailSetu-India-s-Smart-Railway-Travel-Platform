import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Row, Col, Tag, Table, Spin, message, Popconfirm } from 'antd';
import { 
  Search, 
  Train, 
  CheckCircle2, 
  Info, 
  Calendar, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  Lightbulb, 
  Headphones, 
  ArrowRight,
  MapPin,
  XCircle,
  Eye
} from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const { Title, Text } = Typography;

const PNRStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const getBookingByPNR = useBookingStore((state) => state.getBookingByPNR);
  const cancelBookingStore = useBookingStore((state) => state.cancelBooking);
  const bookings = useBookingStore((state) => state.bookings);
  
  const initialPNR = searchParams.get('pnr') || location.state?.pnr || '2457812365';
  const [pnrInput, setPnrInput] = useState(initialPNR);
  const [loading, setLoading] = useState(false);
  const [pnrResult, setPnrResult] = useState(null);

  const handleCheckPNR = (pnrToSearch = pnrInput) => {
    const cleanedPNR = (pnrToSearch || '').trim();
    if (!cleanedPNR || !/^\d{10}$/.test(cleanedPNR)) {
      message.warning('Please enter a valid 10-digit PNR number (e.g. 2457812365)');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const data = getBookingByPNR(cleanedPNR);
      if (data) {
        setPnrResult(data);
        message.success('PNR Status updated in real-time');
      } else {
        setPnrResult(null);
        message.error('No record found for the entered PNR number');
      }
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    const pnrParam = searchParams.get('pnr') || location.state?.pnr;
    const targetPNR = pnrParam || '2457812365';
    setPnrInput(targetPNR);
    handleCheckPNR(targetPNR);
  }, [searchParams, location.state]);

  const passengerColumns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      key: 'sNo',
      width: 70,
      render: (text) => <Text style={{ color: '#64748b' }}>{text}</Text>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong style={{ color: '#1e293b' }}>{text}</Text>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      render: (text) => <Text style={{ color: '#475569' }}>{text}</Text>
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      render: (text) => <Text style={{ color: '#475569' }}>{text}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (text) => {
        let bg = '#e6f4ea';
        let color = '#137333';
        if (text && text.includes('RAC')) {
          bg = '#fff7e6';
          color = '#d46b08';
        } else if (text && (text.includes('WL') || text.includes('WAIT'))) {
          bg = '#fff2e8';
          color = '#d4380d';
        } else if (text && text.includes('CAN')) {
          bg = '#f5f5f5';
          color = '#595959';
        }
        return (
          <Tag 
            style={{
              borderRadius: '6px',
              padding: '2px 10px',
              fontWeight: '700',
              fontSize: '0.78rem',
              backgroundColor: bg,
              color: color,
              border: 'none'
            }}
          >
            {text}
          </Tag>
        );
      }
    },
    {
      title: 'Berth No.',
      dataIndex: 'berth',
      key: 'berth',
      width: 110,
      render: (text) => <Text strong style={{ color: '#334155' }}>{text}</Text>
    },
    {
      title: 'Coach No.',
      dataIndex: 'coach',
      key: 'coach',
      width: 110,
      render: (text) => <Text strong style={{ color: '#334155' }}>{text}</Text>
    }
  ];

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
            alt="PNR Banner"
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
            <Train size={32} color="#ffffff" />
          </div>
          <div>
            <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>
              PNR Status
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
              Check the current status of your PNR and get real-time updates on your train journey.
            </Text>
          </div>
        </div>
      </div>

      {/* 2. Main Search & Result Section */}
      <Row gutter={[24, 24]}>
        
        {/* Left Column (Main Search & PNR Details) */}
        <Col xs={24} lg={16}>
          
          {/* Card: PNR Search Box */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ marginBottom: '12px' }}>
              <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                Enter PNR Number
              </Text>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Input 
                size="large"
                placeholder="Enter 10 digit PNR number (e.g. 2457812365)"
                value={pnrInput}
                onChange={(e) => setPnrInput(e.target.value)}
                onPressEnter={() => handleCheckPNR(pnrInput)}
                prefix={<Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />}
                style={{ borderRadius: '12px', height: '48px', fontSize: '1rem' }}
                maxLength={10}
              />
              <Button 
                type="primary"
                size="large"
                onClick={() => handleCheckPNR(pnrInput)}
                loading={loading}
                style={{
                  height: '48px',
                  padding: '0 28px',
                  borderRadius: '12px',
                  backgroundColor: '#1890ff',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Get PNR Status <ArrowRight size={16} />
              </Button>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Text type="secondary" style={{ fontSize: '0.8rem', fontWeight: '600' }}>Your & Sample PNRs:</Text>
              {bookings && bookings.length > 0 && bookings.slice(0, 3).map((b) => (
                <Tag
                  key={b.pnr}
                  color="green"
                  style={{ cursor: 'pointer', borderRadius: '6px', padding: '2px 10px', fontWeight: '600' }}
                  onClick={() => {
                    setPnrInput(b.pnr);
                    handleCheckPNR(b.pnr);
                  }}
                >
                  {b.pnr} ({b.trainName})
                </Tag>
              ))}
              {[
                { pnr: '2457812365', label: '2457812365 (Confirmed)' },
                { pnr: '8549120364', label: '8549120364 (RAC)' },
                { pnr: '9812456730', label: '9812456730 (WL)' }
              ].map((sample) => (
                <Tag 
                  key={sample.pnr} 
                  color="blue" 
                  style={{ cursor: 'pointer', borderRadius: '6px', padding: '2px 10px', fontWeight: '600' }}
                  onClick={() => {
                    setPnrInput(sample.pnr);
                    handleCheckPNR(sample.pnr);
                  }}
                >
                  {sample.label}
                </Tag>
              ))}
            </div>
          </Card>

          {/* Card: PNR Result Details */}
          {loading ? (
            <Card style={{ borderRadius: '16px', textAlign: 'center', padding: '60px' }}>
              <Spin size="large" />
              <Text style={{ display: 'block', marginTop: '16px', color: '#64748b' }}>
                Fetching real-time PNR Status...
              </Text>
            </Card>
          ) : pnrResult ? (
            <div>
              {/* Dynamic Status Alert Banner */}
              {(() => {
                const bannerInfo = getStatusBannerInfo(pnrResult.status);
                return (
                  <div 
                    style={{
                      backgroundColor: bannerInfo.bg,
                      border: `1px solid ${bannerInfo.border}`,
                      borderRadius: '16px',
                      padding: '20px 24px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div 
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          backgroundColor: bannerInfo.iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                        }}
                      >
                        <CheckCircle2 size={24} color="#ffffff" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Title level={4} style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>
                            PNR Status:
                          </Title>
                          <Title level={4} style={{ margin: 0, fontWeight: '800', color: bannerInfo.color }}>
                            {pnrResult.status}
                          </Title>
                        </div>
                        <Text type="secondary" style={{ fontSize: '0.88rem' }}>
                          {bannerInfo.msg}
                        </Text>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>PNR No.</Text>
                      <Text strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '2px' }}>
                        {pnrResult.pnr}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Booking Date</Text>
                      <Text strong style={{ fontSize: '0.85rem', color: '#475569' }}>
                        {pnrResult.bookingDate}
                      </Text>
                    </div>
                  </div>
                );
              })()}

              {/* Train & Journey Details Card */}
              <Card 
                bordered={false} 
                style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px', backgroundColor: '#f8fafc' }}
                bodyStyle={{ padding: '24px' }}
              >
                <Row gutter={[20, 20]} align="middle">
                  {/* Train Info */}
                  <Col span={7}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Train size={22} color="#0d47a1" />
                      </div>
                      <div>
                        <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Train No.</Text>
                        <Text strong style={{ fontSize: '1.2rem', color: '#1e293b', display: 'block' }}>
                          {pnrResult.trainNumber}
                        </Text>
                        <Text style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '500' }}>
                          {pnrResult.trainName}
                        </Text>
                      </div>
                    </div>
                  </Col>

                  {/* Route Info */}
                  <Col span={10}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>From</Text>
                        <Text strong style={{ fontSize: '1.2rem', color: '#1e293b', display: 'block' }}>
                          {pnrResult.source}
                        </Text>
                        <Text style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {pnrResult.sourceFull}
                        </Text>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ArrowRight size={22} color="#0d47a1" />
                      </div>

                      <div>
                        <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>To</Text>
                        <Text strong style={{ fontSize: '1.2rem', color: '#1e293b', display: 'block' }}>
                          {pnrResult.destination}
                        </Text>
                        <Text style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {pnrResult.destinationFull}
                        </Text>
                      </div>
                    </div>
                  </Col>

                  {/* Journey Date & Class */}
                  <Col span={7}>
                    <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '20px' }}>
                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Journey Date</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Calendar size={16} color="#0d47a1" />
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                          {pnrResult.journeyDate}
                        </Text>
                      </div>

                      <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Class</Text>
                      <Text strong style={{ fontSize: '0.9rem', color: '#334155' }}>
                        {pnrResult.className}
                      </Text>
                    </div>
                  </Col>
                </Row>

                <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' }} />

                {/* Timing & Status Bar */}
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="#64748b" />
                      <div>
                        <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block' }}>Departure</Text>
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{pnrResult.departureTime}</Text>
                        <Text type="secondary" style={{ fontSize: '0.72rem', display: 'block' }}>{pnrResult.sourceFull}</Text>
                      </div>
                    </div>
                  </Col>

                  <Col span={6}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="#64748b" />
                      <div>
                        <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block' }}>Arrival</Text>
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{pnrResult.arrivalTime}</Text>
                        <Text type="secondary" style={{ fontSize: '0.72rem', display: 'block' }}>{pnrResult.destinationFull}</Text>
                      </div>
                    </div>
                  </Col>

                  <Col span={6}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="#64748b" />
                      <div>
                        <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block' }}>Travel Duration</Text>
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{pnrResult.duration}</Text>
                      </div>
                    </div>
                  </Col>

                  <Col span={6} style={{ textAlign: 'right' }}>
                    <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Current Status</Text>
                    <Tag color="green" style={{ borderRadius: '6px', padding: '4px 12px', fontWeight: '700', fontSize: '0.82rem', backgroundColor: '#e6f4ea', color: '#137333', border: 'none' }}>
                      {pnrResult.currentStatus}
                    </Tag>
                  </Col>
                </Row>
              </Card>

              {/* Passenger Details Table Card */}
              <Card 
                bordered={false} 
                style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
                bodyStyle={{ padding: '24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <UserCheck size={20} color="#0d47a1" />
                  <Title level={4} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                    Passenger Details
                  </Title>
                </div>

                <Table 
                  columns={passengerColumns} 
                  dataSource={pnrResult.passengers}
                  rowKey="sNo"
                  pagination={false}
                  style={{ borderRadius: '10px', overflow: 'hidden' }}
                />

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button 
                    type="primary" 
                    icon={<Train size={16} />}
                    onClick={() => navigate(`/live?train=${pnrResult.trainNumber}`)}
                    style={{ borderRadius: '8px', fontWeight: '600' }}
                  >
                    Track Live Train Status
                  </Button>
                  <Button 
                    icon={<Eye size={16} />}
                    onClick={() => navigate('/my-bookings')}
                    style={{ borderRadius: '8px', fontWeight: '600' }}
                  >
                    View in My Bookings
                  </Button>
                  {pnrResult.status !== 'Cancelled' && pnrResult.status !== 'CANCELLED' && (
                    <Popconfirm
                      title="Cancel Ticket"
                      description="Are you sure you want to cancel this ticket?"
                      onConfirm={() => {
                        cancelBookingStore(pnrResult.pnr);
                        message.info('Ticket cancelled successfully');
                        handleCheckPNR(pnrResult.pnr);
                      }}
                      okText="Yes, Cancel"
                      cancelText="No"
                    >
                      <Button 
                        danger 
                        icon={<XCircle size={16} />}
                        style={{ borderRadius: '8px', fontWeight: '600', marginLeft: 'auto' }}
                      >
                        Cancel Ticket
                      </Button>
                    </Popconfirm>
                  )}
                </div>
              </Card>

              {/* Bottom Blue Info Alert Banner */}
              <div 
                style={{
                  backgroundColor: '#e6f7ff',
                  border: '1px solid #91d5ff',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Info size={18} color="#1890ff" />
                <Text style={{ color: '#0050b3', fontSize: '0.85rem' }}>
                  Your PNR is confirmed. Please check the coach position and platform number 4 hours before departure.
                </Text>
              </div>
            </div>
          ) : (
            <Card style={{ borderRadius: '16px', textAlign: 'center', padding: '40px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <Info size={40} color="#fa8c16" style={{ marginBottom: '12px' }} />
              <Title level={4} style={{ margin: '0 0 6px 0', color: '#1e293b', fontWeight: '700' }}>
                No PNR Record Found
              </Title>
              <Text type="secondary" style={{ fontSize: '0.9rem', display: 'block', maxWidth: '420px', margin: '0 auto 16px' }}>
                No booking record could be retrieved for PNR number <Text strong>{pnrInput}</Text>. Please verify the 10-digit PNR number or try one of the sample PNRs above.
              </Text>
              <Button 
                type="primary" 
                onClick={() => {
                  setPnrInput('2457812365');
                  handleCheckPNR('2457812365');
                }}
                style={{ borderRadius: '8px', fontWeight: '600' }}
              >
                Load Sample PNR (2457812365)
              </Button>
            </Card>
          )}

        </Col>

        {/* Right Sidebar Column */}
        <Col xs={24} lg={8}>
          
          {/* Card 1: PNR Status Information */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <ShieldCheck size={20} color="#0d47a1" />
              <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                PNR Status Information
              </Title>
            </div>
            <Text type="secondary" style={{ fontSize: '0.85rem', lineHeight: 1.6, display: 'block' }}>
              PNR (Passenger Name Record) is a unique 10-digit number allotted to your booking. You can check the current status of your ticket, coach position, berth details and more.
            </Text>
          </Card>

          {/* Card 2: PNR Status Legend */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <ShieldCheck size={20} color="#0d47a1" />
              <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                PNR Status Legend
              </Title>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { tag: 'CNF', color: '#e6f4ea', text: '#137333', title: 'Confirmed', desc: 'Ticket is confirmed.' },
                { tag: 'RAC', color: '#fff7e6', text: '#d46b08', title: 'Reservation Against Cancellation', desc: 'You are in the waiting list (RAC).' },
                { tag: 'WL', color: '#fff2e8', text: '#d4380d', title: 'Waiting List', desc: 'Your ticket is in waiting list.' },
                { tag: 'CAN', color: '#f5f5f5', text: '#595959', title: 'Cancelled', desc: 'Ticket has been cancelled.' },
                { tag: 'NQ', color: '#f9f0ff', text: '#722ed1', title: 'No Quota', desc: 'No seats available in the requested quota.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Tag style={{ backgroundColor: item.color, color: item.text, fontWeight: '700', border: 'none', minWidth: '46px', textAlign: 'center', marginTop: '2px' }}>
                    {item.tag}
                  </Tag>
                  <div>
                    <Text strong style={{ fontSize: '0.85rem', color: '#1e293b' }}>{item.title}</Text>
                    <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>– {item.desc}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 3: Quick Tips */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Lightbulb size={20} color="#0d47a1" />
              <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                Quick Tips
              </Title>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Use the 10-digit PNR number (e.g. 2457812365).',
                'Status is updated in real-time.',
                'If the status is RAC/WL, check again before departure for any changes.',
                'For any issues, contact Indian Railways helpline at 139 or visit the nearest railway counter.'
              ].map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="#0d47a1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <Text style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                    {tip}
                  </Text>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 4: Need Help Call CTA */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #0d1b2a 0%, #0a2540 100%)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Headphones size={22} color="#ffffff" />
              </div>
              <div>
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem', display: 'block' }}>
                  Need Help?
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem' }}>
                  Call 139 (24x7)
                </Text>
              </div>
            </div>
            <ArrowRight size={20} color="#ffffff" />
          </div>

        </Col>

      </Row>

    </div>
  );
};

export default PNRStatus;

import React, { useState } from 'react';
import { Card, Form, Select, Button, DatePicker, Typography, Space, Row, Col, Tag, Divider, Modal, Timeline } from 'antd';
import { Search, MapPin, Calendar, CreditCard, Clock, CalendarDays, Activity, Compass, Utensils, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

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

const Home = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [routeModalVisible, setRouteModalVisible] = useState(false);
  const [selectedTrainRoute, setSelectedTrainRoute] = useState(null);
  const navigate = useNavigate();

  const onSearch = async (values) => {
    setLoading(true);
    setSearched(true);
    try {
      // Pass the selected date so we can display it later
      const { data } = await axios.get(`http://localhost:5000/api/trains/search?from=${values.from}&to=${values.to}&date=${values.date.format('YYYY-MM-DD')}`);
      setTrains(data);
      setSearchParams({ ...values, dateObj: values.date });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (depTime, arrTime, depDay, arrDay) => {
    if (!depTime || !arrTime) return '--';
    const [depH, depM] = depTime.split(':').map(Number);
    const [arrH, arrM] = arrTime.split(':').map(Number);
    
    let totalMins = ((arrDay - depDay) * 24 * 60) + (arrH * 60 + arrM) - (depH * 60 + depM);
    if (totalMins < 0) totalMins += 24 * 60; // Just in case it wraps around midnight incorrectly without day increment
    
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${h}h ${m}m`;
  };

  const renderTrainCard = (train) => {
    const dep = train.route.find(r => r.stationCode === searchParams?.from);
    const arr = train.route.find(r => r.stationCode === searchParams?.to);
    
    // Calculate display dates based on user search date
    let depDateStr = '';
    let arrDateStr = '';
    if (searchParams?.dateObj && dep && arr) {
       // Since users are searching from origin, we assume the journey starts on their searched date
       const baseDate = searchParams.dateObj;
       depDateStr = baseDate.add(dep.day - 1, 'day').format('DD MMM, ddd');
       arrDateStr = baseDate.add(arr.day - 1, 'day').format('DD MMM, ddd');
    }
    
    const duration = calculateDuration(dep?.departureTime, arr?.arrivalTime, dep?.day || 1, arr?.day || 1);
    
    return (
      <Card 
        key={train._id} 
        style={{ marginBottom: '16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}
        bodyStyle={{ padding: '0' }}
      >
        <div style={{ backgroundColor: '#f7f9fa', padding: '12px 24px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <div>
            <Title level={4} style={{ margin: 0, color: '#213d77' }}>{train.name} <Text type="secondary" style={{ fontSize: '1rem', fontWeight: 'normal' }}>({train.trainNumber})</Text></Title>
          </div>
          <div>
             <Text type="secondary" style={{ fontSize: '13px' }}><Clock size={14} style={{verticalAlign: 'middle', marginRight: 4}}/> Runs On: <Text strong>{train.runsOn.join(', ')}</Text></Text>
          </div>
        </div>
        
        <div style={{ padding: '24px' }}>
          <Row align="middle" gutter={32}>
            {/* Timing Section */}
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ margin: 0, color: '#333' }}>{dep?.departureTime}</Title>
                  <Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>{dep?.stationName} ({dep?.stationCode})</Text>
                  <Text type="secondary" strong style={{ fontSize: '12px', color: '#666' }}><CalendarDays size={12} style={{verticalAlign:'middle'}}/> {depDateStr}</Text>
                </div>
                <div style={{ flex: 1, padding: '0 16px', textAlign: 'center' }}>
                  <Text type="secondary" strong style={{ fontSize: '13px', color: '#0052cc' }}>{duration}</Text>
                  <Divider style={{ margin: '4px 0', borderColor: '#d9d9d9', borderStyle: 'dashed' }} />
                  <Button 
                    type="link" 
                    size="small" 
                    style={{ fontSize: '12px', padding: 0, height: 'auto', color: '#888' }}
                    onClick={() => {
                      setSelectedTrainRoute(train);
                      setRouteModalVisible(true);
                    }}
                  >
                    View Route
                  </Button>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ margin: 0, color: '#1e293b' }}>{arr?.arrivalTime}</Title>
                  <Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>{arr?.stationName} ({arr?.stationCode})</Text>
                  <Text type="secondary" strong style={{ fontSize: '12px', color: '#666' }}><CalendarDays size={12} style={{verticalAlign:'middle'}}/> {arrDateStr}</Text>
                </div>
              </div>
            </Col>
            
            {/* Availability Section */}
            <Col xs={24} md={16} style={{ borderLeft: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {train.classes.map(c => (
                  <Card 
                    key={c.className} 
                    hoverable
                    onClick={() => navigate(`/book/${train._id}`, { state: { train, searchParams, selectedClass: c } })}
                    style={{ 
                      minWidth: '130px', 
                      borderRadius: '8px', 
                      borderColor: '#e8e8e8',
                      flexShrink: 0,
                      cursor: 'pointer'
                    }}
                    bodyStyle={{ padding: '12px', textAlign: 'center' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <Text strong style={{ fontSize: '16px', color: '#213d77' }}>{c.className}</Text>
                      <Text strong style={{ color: '#FB792B' }}>₹{c.fare}</Text>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <Text type="success" strong style={{ fontSize: '13px' }}>AVAILABLE - {c.totalSeats}</Text>
                    </div>
                    <Button type="primary" size="small" style={{ width: '100%', marginTop: '12px', borderRadius: '4px' }}>Book Now</Button>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    );
  };

  return (
    <div>
      {/* Banner Section */}
      <div style={{
        position: 'relative',
        background: 'url("https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1200&auto=format&fit=crop") no-repeat center center',
        backgroundSize: 'cover',
        padding: '60px 40px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        
        <Card style={{ 
          width: 450, 
          borderRadius: 12, 
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          zIndex: 1,
          border: 'none',
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: 0 }}
        >
          <div style={{ background: '#213d77', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <CreditCard color="#fff" />
             <Title level={4} style={{ color: '#fff', margin: 0 }}>BOOK TICKET</Title>
          </div>
          <div style={{ padding: '24px' }}>
            <Form layout="vertical" size="large" onFinish={onSearch}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="from" rules={[{ required: true, message: 'Source required' }]}>
                    <Select
                      showSearch
                      size="large"
                      placeholder={<div><MapPin size={18} color="#bfbfbf" style={{marginRight: 8, verticalAlign: 'middle'}}/> From Station</div>}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={STATION_LIST.map(s => ({ value: s.code, label: `${s.name} (${s.code})` }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="to" rules={[{ required: true, message: 'Destination required' }]}>
                    <Select
                      showSearch
                      size="large"
                      placeholder={<div><MapPin size={18} color="#bfbfbf" style={{marginRight: 8, verticalAlign: 'middle'}}/> To Station</div>}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={STATION_LIST.map(s => ({ value: s.code, label: `${s.name} (${s.code})` }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="date" rules={[{ required: true, message: 'Date required' }]}>
                    <DatePicker style={{ width: '100%' }} prefix={<Calendar size={18} color="#bfbfbf" />} placeholder="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button type="primary" htmlType="submit" size="large" block style={{ fontWeight: 'bold', height: '48px', fontSize: '1.1rem' }} loading={loading}>
                    Search Trains
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
      </div>

      {/* Search Results Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        {searched && (
          <div>
            <Title level={3} style={{ color: '#213d77', marginBottom: '24px' }}>
              Train Availability ({trains.length} found)
            </Title>
            
            {trains.length > 0 ? (
              trains.map(train => renderTrainCard(train))
            ) : (
              <Card style={{ textAlign: 'center', padding: '40px' }}>
                <Text type="secondary" style={{ fontSize: '1.2rem' }}>No trains found for this route.</Text>
              </Card>
            )}
          </div>
        )}

        {!searched && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Title level={2} style={{ color: '#1e293b' }}>Plan Your Perfect Journey</Title>
            <Text type="secondary" style={{ fontSize: '1.1rem' }}>Search across 1000+ routes with real-time tracking.</Text>
          </div>
        )}
      </div>

      {/* Services Grid Section */}
      <div style={{ background: '#fff', padding: '60px 20px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#1e293b', textAlign: 'center', marginBottom: '40px' }}>RailSetu Super Services</Title>
          <Row gutter={[24, 24]}>
            <Col xs={12} md={6}>
              <Card hoverable onClick={() => navigate('/pnr')} style={{ textAlign: 'center', borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <Activity size={48} color="#0052cc" style={{ marginBottom: '16px' }} />
                <Title level={4} style={{ color: '#1e293b' }}>PNR Status</Title>
                <Text type="secondary">Check your ticket confirmation</Text>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card hoverable onClick={() => navigate('/track')} style={{ textAlign: 'center', borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <Compass size={48} color="#FB792B" style={{ marginBottom: '16px' }} />
                <Title level={4} style={{ color: '#1e293b' }}>Live Tracking</Title>
                <Text type="secondary">Find where your train is</Text>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card hoverable onClick={() => navigate('/food')} style={{ textAlign: 'center', borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <Utensils size={48} color="#00a854" style={{ marginBottom: '16px' }} />
                <Title level={4} style={{ color: '#1e293b' }}>E-Catering</Title>
                <Text type="secondary">Order food to your seat</Text>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card hoverable onClick={() => navigate('/madad')} style={{ textAlign: 'center', borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <AlertTriangle size={48} color="#f04134" style={{ marginBottom: '16px' }} />
                <Title level={4} style={{ color: '#1e293b' }}>Rail Madad</Title>
                <Text type="secondary">Grievance & Medical help</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div style={{ background: '#f7f9fa', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#1e293b', marginBottom: '40px' }}>Why Choose RailSetu?</Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <ShieldCheck size={40} color="#0052cc" style={{ marginBottom: '16px' }} />
              <Title level={4}>Secure Bookings</Title>
              <Text type="secondary">Verified Aadhaar authentication ensuring zero fraud and genuine passenger travel.</Text>
            </Col>
            <Col xs={24} md={8}>
              <Zap size={40} color="#FB792B" style={{ marginBottom: '16px' }} />
              <Title level={4}>Lightning Fast</Title>
              <Text type="secondary">Experience India's fastest train search engine powered by robust caching.</Text>
            </Col>
            <Col xs={24} md={8}>
              <CreditCard size={40} color="#00a854" style={{ marginBottom: '16px' }} />
              <Title level={4}>Instant Refunds</Title>
              <Text type="secondary">Seamless cancellation with automated instant refunds straight to your R-Wallet.</Text>
            </Col>
          </Row>
        </div>
      </div>

      {/* Route Modal */}
      <Modal
        title={
          <div style={{ paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
            <Title level={4} style={{ margin: 0, color: '#1e293b' }}>{selectedTrainRoute?.name}</Title>
            <Text type="secondary">Train No: {selectedTrainRoute?.trainNumber}</Text>
          </div>
        }
        visible={routeModalVisible}
        onCancel={() => setRouteModalVisible(false)}
        footer={null}
        bodyStyle={{ paddingTop: '24px' }}
      >
        <Timeline
          items={selectedTrainRoute?.route?.sort((a, b) => a.distance - b.distance).map((stop, index) => ({
            color: index === 0 ? 'green' : index === selectedTrainRoute.route.length - 1 ? 'red' : 'blue',
            children: (
              <div>
                <Text strong style={{ fontSize: '16px' }}>{stop.stationName} ({stop.stationCode})</Text>
                <br />
                <Text type="secondary">
                  Arrives: <b>{stop.arrivalTime}</b> | Departs: <b>{stop.departureTime}</b>
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>Day {stop.day} | Distance: {stop.distance} km</Text>
              </div>
            )
          }))}
        />
      </Modal>
    </div>
  );
};

export default Home;

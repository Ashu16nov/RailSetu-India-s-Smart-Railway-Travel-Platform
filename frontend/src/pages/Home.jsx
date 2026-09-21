import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Input, Select, DatePicker, Checkbox, Button, Divider, Modal, Form, message, Tag } from 'antd';
import { SwapOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Train, Calendar, Info, MapPin, Coffee, HelpCircle, Shield, Umbrella, Ticket, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ArrowRight = ({ size, color }) => <span style={{ color, fontSize: size }}>&rarr;</span>;

const Home = () => {
  const navigate = useNavigate();
  const bookings = useBookingStore(state => state.bookings);
  const addBooking = useBookingStore(state => state.addBooking);
  const fetchBookings = useBookingStore(state => state.fetchBookings);

  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState(null);
  const [travelClass, setTravelClass] = useState('all');
  const [pnrTabInput, setPnrTabInput] = useState('');
  const [liveTabInput, setLiveTabInput] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSearchTrains = (source = fromStation, dest = toStation) => {
    const src = source || fromStation || 'New Delhi (NDLS)';
    const dst = dest || toStation || 'Varanasi (BSB)';

    // Extract station code if present
    const srcCode = src.includes('(') ? src.match(/\(([^)]+)\)/)?.[1] || 'NDLS' : src.slice(0, 4).toUpperCase();
    const dstCode = dst.includes('(') ? dst.match(/\(([^)]+)\)/)?.[1] || 'BSB' : dst.slice(0, 4).toUpperCase();

    navigate('/book', {
      state: {
        fromCode: srcCode,
        toCode: dstCode,
        journeyDate: journeyDate ? journeyDate.format('YYYY-MM-DD') : null,
        travelClass: travelClass === 'all' ? 'SL' : travelClass
      }
    });
  };

  const handleCheckPNRSubmit = () => {
    const cleaned = pnrTabInput.trim();
    if (!cleaned) {
      message.warning('Please enter a PNR number');
      return;
    }
    navigate(`/pnr?pnr=${cleaned}`);
  };

  const handleLiveStatusSubmit = () => {
    const cleaned = liveTabInput.trim();
    if (!cleaned) {
      message.warning('Please enter a Train Number or Name');
      return;
    }
    navigate(`/live?train=${encodeURIComponent(cleaned)}`);
  };

  const upcoming = bookings.find(b => b.status === 'CONFIRMED') || bookings[0];

  return (
    <div style={{ paddingBottom: '40px' }}>
      <Row gutter={[24, 24]}>
        {/* Left Column (Main Content) */}
        <Col xs={24} lg={16} xl={17}>
          
          {/* Hero Banner */}
          <div style={{
            height: '240px',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Train Landscape"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,35,75,0.9))' }}></div>
            
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', alignItems: 'flex-end', textAlign: 'right' }}>
              <Title level={1} style={{ color: '#fff', margin: 0, fontSize: '2.5rem', fontWeight: '800' }}>
                Explore India
              </Title>
              <Title level={2} style={{ color: '#FDB813', marginTop: '-5px', marginBottom: '15px', fontSize: '2rem', fontWeight: '800' }}>
                By Rail
              </Title>
              <Text style={{ color: '#e6f7ff', fontSize: '1rem', marginBottom: '20px', fontWeight: '500' }}>
                Comfortable &bull; Safe &bull; On Time
              </Text>
              <Button type="default" onClick={() => handleSearchTrains()} style={{ borderRadius: '24px', padding: '0 24px', height: '40px', fontWeight: '600', color: '#00234b', border: 'none' }}>
                Book Your Journey &rarr;
              </Button>
            </div>
          </div>

          {/* Booking Widget */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '24px' }}
            bodyStyle={{ padding: '0' }}
          >
            <Tabs defaultActiveKey="1" centered size="large" tabBarGutter={60} style={{ padding: '10px 24px 0' }}>
              <TabPane tab={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}><Train size={18}/> Book Ticket</span>} key="1">
                <div style={{ padding: '10px 24px 30px' }}>
                  <Row gutter={16} align="middle">
                    <Col span={9}>
                      <div style={{ marginBottom: '8px' }}><Text style={{ color: '#8c8c8c', fontSize: '0.85rem' }}>From</Text></div>
                      <Input 
                        size="large" 
                        value={fromStation}
                        onChange={(e) => setFromStation(e.target.value)}
                        prefix={<MapPin size={16} color="#bfbfbf" style={{ marginRight: '8px' }}/>} 
                        placeholder="Enter departure station" 
                        style={{ borderRadius: '8px' }} 
                      />
                    </Col>
                    <Col span={2} style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                      <div 
                        onClick={() => { const temp = fromStation; setFromStation(toStation); setToStation(temp); }}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f0f5ff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#1890ff' }}
                      >
                        <SwapOutlined />
                      </div>
                    </Col>
                    <Col span={13}>
                      <Row gutter={16}>
                        <Col span={9}>
                          <div style={{ marginBottom: '8px' }}><Text style={{ color: '#8c8c8c', fontSize: '0.85rem' }}>To</Text></div>
                          <Input 
                            size="large" 
                            value={toStation}
                            onChange={(e) => setToStation(e.target.value)}
                            prefix={<MapPin size={16} color="#bfbfbf" style={{ marginRight: '8px' }}/>} 
                            placeholder="Enter destination station" 
                            style={{ borderRadius: '8px' }} 
                          />
                        </Col>
                        <Col span={8}>
                          <div style={{ marginBottom: '8px' }}><Text style={{ color: '#8c8c8c', fontSize: '0.85rem' }}>Journey Date</Text></div>
                          <DatePicker 
                            size="large" 
                            onChange={(d) => setJourneyDate(d)}
                            style={{ width: '100%', borderRadius: '8px' }} 
                          />
                        </Col>
                        <Col span={7}>
                          <div style={{ marginBottom: '8px' }}><Text style={{ color: '#8c8c8c', fontSize: '0.85rem' }}>Class</Text></div>
                          <Select 
                            size="large" 
                            value={travelClass}
                            onChange={(v) => setTravelClass(v)}
                            style={{ width: '100%' }} 
                            options={[
                              {value: 'all', label: 'All Classes'},
                              {value: '1AC', label: 'AC First Class (1A)'},
                              {value: '2AC', label: 'AC 2 Tier (2A)'},
                              {value: '3AC', label: 'AC 3 Tier (3A)'},
                              {value: 'SL', label: 'Sleeper (SL)'}
                            ]} 
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                    <Checkbox style={{ color: '#595959' }}>Show only available trains</Checkbox>
                    <Button 
                      type="primary" 
                      size="large" 
                      onClick={() => handleSearchTrains()}
                      icon={<SearchOutlined />} 
                      style={{ borderRadius: '8px', padding: '0 30px', fontWeight: '600', backgroundColor: '#1890ff' }}
                    >
                      Search Trains
                    </Button>
                  </div>
                </div>
              </TabPane>
              
              <TabPane tab={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}><Info size={18}/> Check PNR</span>} key="2">
                <div style={{ padding: '20px 24px 30px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                  <Text style={{ display: 'block', color: '#64748b', marginBottom: '16px', fontWeight: '500' }}>
                    Enter your 10-digit PNR number to get real-time status updates:
                  </Text>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <Input 
                      size="large" 
                      placeholder="e.g. 2457812365" 
                      value={pnrTabInput}
                      onChange={(e) => setPnrTabInput(e.target.value)}
                      onPressEnter={handleCheckPNRSubmit}
                      style={{ borderRadius: '8px', maxWidth: '350px' }}
                    />
                    <Button type="primary" size="large" onClick={handleCheckPNRSubmit} style={{ borderRadius: '8px', fontWeight: '600' }}>
                      Check PNR Status
                    </Button>
                  </div>
                </div>
              </TabPane>

              <TabPane tab={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}><Calendar size={18}/> Live Train Status</span>} key="3">
                <div style={{ padding: '20px 24px 30px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                  <Text style={{ display: 'block', color: '#64748b', marginBottom: '16px', fontWeight: '500' }}>
                    Enter Train Number or Name to track live running status:
                  </Text>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <Input 
                      size="large" 
                      placeholder="e.g. 12650 or Kashi Express" 
                      value={liveTabInput}
                      onChange={(e) => setLiveTabInput(e.target.value)}
                      onPressEnter={handleLiveStatusSubmit}
                      style={{ borderRadius: '8px', maxWidth: '350px' }}
                    />
                    <Button type="primary" size="large" onClick={handleLiveStatusSubmit} style={{ borderRadius: '8px', fontWeight: '600' }}>
                      Track Live Status
                    </Button>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>

          {/* Popular Routes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
            <Title level={4} style={{ margin: 0, fontWeight: '700', color: '#00234b' }}>Popular Routes</Title>
            <Button type="link" onClick={() => navigate('/book')} style={{ padding: 0, fontWeight: '600' }}>View All &rarr;</Button>
          </div>
          
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            {[
              { img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', title: 'New Delhi (NDLS)', dest: 'Varanasi (BSB)', time: '8h 15m', trains: 5, price: '455' },
              { img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', title: 'Mumbai (CSMT)', dest: 'Pune (PUNE)', time: '3h 10m', trains: 12, price: '210' },
              { img: 'https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', title: 'Kolkata (KOAA)', dest: 'Howrah (HWH)', time: '1h 20m', trains: 8, price: '120' },
              { img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', title: 'Chennai (MAS)', dest: 'Bengaluru (SBC)', time: '5h 45m', trains: 10, price: '315' }
            ].map((route, i) => (
              <Col span={6} key={i}>
                <Card 
                  hoverable
                  onClick={() => handleSearchTrains(route.title, route.dest)}
                  bodyStyle={{ padding: '12px' }}
                  cover={<img alt={route.title} src={route.img} style={{ height: '100px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />}
                  style={{ borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}
                >
                  <Text style={{ fontSize: '0.7rem', color: '#8c8c8c', display: 'block', marginBottom: '2px' }}>{route.title}</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    <ArrowRight size={12} color="#1890ff" />
                    <Text style={{ fontWeight: '700', fontSize: '0.85rem', color: '#262626' }}>{route.dest}</Text>
                  </div>
                  <Text style={{ fontSize: '0.7rem', color: '#8c8c8c', display: 'block', marginBottom: '12px' }}>{route.time} &bull; {route.trains} Trains</Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: '0.75rem', color: '#595959' }}>From <span style={{ fontWeight: '700', color: '#1890ff' }}>₹ {route.price}</span></Text>
                    <ArrowRight size={14} color="#8c8c8c" />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Bottom Promo */}
          <div style={{ backgroundColor: '#e6f0ff', borderRadius: '16px', padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: '#1890ff', borderRadius: '12px', padding: '12px', color: '#fff', transform: 'rotate(-10deg)' }}>
                <Train size={24} />
              </div>
              <div>
                <Title level={4} style={{ margin: 0, color: '#00234b', fontWeight: '700' }}>Plan Your Next Trip</Title>
                <Text style={{ color: '#595959' }}>Discover new places, book tickets, and make unforgettable memories with RailSetu.</Text>
              </div>
            </div>
            <Button type="primary" onClick={() => handleSearchTrains()} style={{ borderRadius: '8px', fontWeight: '600', padding: '0 20px' }}>Explore Now &rarr;</Button>
          </div>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8} xl={7}>

          {/* Upcoming Journey Section (Dynamic) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
            <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#00234b' }}>Upcoming Journey</Title>
            {upcoming && (
              <Button type="link" onClick={() => navigate('/my-bookings')} style={{ padding: 0, fontWeight: '600', fontSize: '0.8rem' }}>
                View Details &rarr;
              </Button>
            )}
          </div>

          {upcoming ? (
            <Card style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '24px', border: 'none' }} bodyStyle={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f0f5ff', padding: '10px', borderRadius: '12px', color: '#1890ff' }}>
                  <Train size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', color: '#262626', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                    {upcoming.trainName} ({upcoming.trainNumber})
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#595959', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <Text style={{ color: '#595959', fontSize: '0.8rem' }}>{upcoming.source}</Text>
                    <ArrowRight size={12} color="#bfbfbf" />
                    <Text style={{ color: '#595959', fontSize: '0.8rem' }}>{upcoming.destination}</Text>
                  </div>
                  <Text style={{ color: '#8c8c8c', fontSize: '0.75rem' }}>{upcoming.journeyDate} &bull; {upcoming.journeyTime}</Text>
                </div>
              </div>
              <Divider style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <Text style={{ color: '#8c8c8c', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Coach</Text>
                  <Text style={{ fontWeight: '700', color: '#262626' }}>{upcoming.coach || 'B3'}</Text>
                </div>
                <div>
                  <Text style={{ color: '#8c8c8c', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Berth</Text>
                  <Text style={{ fontWeight: '700', color: '#262626' }}>{upcoming.berth || '36'}</Text>
                </div>
                <div>
                  <Text style={{ color: '#8c8c8c', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Status</Text>
                  <Text style={{ fontWeight: '700', color: '#52c41a' }}>{upcoming.status || 'Confirmed'}</Text>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button 
                  size="small" 
                  type="primary" 
                  ghost 
                  onClick={() => navigate(`/pnr?pnr=${upcoming.pnr}`)}
                  style={{ flex: 1, borderRadius: '6px', fontSize: '0.75rem' }}
                >
                  Check PNR
                </Button>
                <Button 
                  size="small" 
                  onClick={() => navigate(`/live?train=${upcoming.trainNumber}`)}
                  style={{ flex: 1, borderRadius: '6px', fontSize: '0.75rem' }}
                >
                  Live Status
                </Button>
              </div>
            </Card>
          ) : (
            <Card style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '24px', border: '1px dashed #d9d9d9', textAlign: 'center', backgroundColor: '#fafafa' }} bodyStyle={{ padding: '24px 20px' }}>
              <div style={{ background: '#f5f5f5', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#bfbfbf' }}>
                <Train size={24} />
              </div>
              <Text style={{ display: 'block', color: '#262626', fontWeight: '600', fontSize: '0.95rem', marginBottom: '4px' }}>
                No Upcoming Journey
              </Text>
              <Text style={{ display: 'block', color: '#8c8c8c', fontSize: '0.8rem', marginBottom: '16px' }}>
                Book a train ticket to view your active reservation details here.
              </Text>
              <Button 
                type="primary" 
                onClick={() => handleSearchTrains()}
                style={{ borderRadius: '8px', background: '#1890ff', fontWeight: '600' }}
              >
                Book a Ticket
              </Button>
            </Card>
          )}

          {/* Recent Bookings Section (Dynamic) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
            <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#00234b' }}>Recent Bookings</Title>
            {bookings.length > 0 && (
              <Button type="link" onClick={() => navigate('/my-bookings')} style={{ padding: 0, fontWeight: '600', fontSize: '0.8rem' }}>
                View All &rarr;
              </Button>
            )}
          </div>

          {bookings.length > 0 ? (
            <Card style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '24px', border: 'none' }} bodyStyle={{ padding: '0' }}>
              {bookings.slice(0, 3).map((item, i) => (
                <div 
                  key={item._id || i} 
                  onClick={() => navigate(`/pnr?pnr=${item.pnr}`)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '16px 20px', 
                    borderBottom: i < Math.min(bookings.length, 3) - 1 ? '1px solid #f0f0f0' : 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ background: '#f0f5ff', padding: '8px', borderRadius: '8px', color: '#1890ff' }}>
                    <Train size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600', color: '#262626', fontSize: '0.85rem', display: 'block' }}>
                      {item.trainName} ({item.trainNumber})
                    </Text>
                    <Text style={{ color: '#8c8c8c', fontSize: '0.75rem' }}>
                      {item.source} &rarr; {item.destination} &bull; {item.journeyDate}
                    </Text>
                  </div>
                  <Text style={{ color: item.status === 'CONFIRMED' ? '#52c41a' : '#f5222d', fontSize: '0.75rem', fontWeight: '600' }}>
                    {item.status || 'Confirmed'}
                  </Text>
                </div>
              ))}
            </Card>
          ) : (
            <Card style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '24px', border: '1px dashed #d9d9d9', textAlign: 'center', backgroundColor: '#fafafa' }} bodyStyle={{ padding: '20px' }}>
              <Text style={{ display: 'block', color: '#8c8c8c', fontSize: '0.85rem', fontWeight: '500' }}>
                No recent bookings found
              </Text>
            </Card>
          )}

          {/* Important Notice */}
          <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ background: '#faad14', borderRadius: '50%', padding: '6px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Info size={16} />
            </div>
            <div>
              <Text style={{ color: '#d48806', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Important</Text>
              <Text style={{ color: '#8c8c8c', fontSize: '0.8rem', display: 'block', marginBottom: '8px' }}>
                Train services may be affected due to maintenance work on 15 Sep 2025.
              </Text>
              <Button type="link" style={{ padding: 0, fontSize: '0.8rem', fontWeight: '600', color: '#1890ff' }}>View Details &rarr;</Button>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
            <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#00234b' }}>Quick Links</Title>
          </div>
          <Row gutter={[16, 16]}>
            {[
              { icon: <Coffee size={20} color="#1890ff" />, label: 'Food on Train' },
              { icon: <MapPin size={20} color="#1890ff" />, label: 'Station Info' },
              { icon: <Shield size={20} color="#1890ff" />, label: 'Travel Insurance' },
              { icon: <Umbrella size={20} color="#1890ff" />, label: 'Tourist Places' },
              { icon: <HelpCircle size={20} color="#1890ff" />, label: 'Help & Support' },
              { icon: <Info size={20} color="#1890ff" />, label: 'FAQs' }
            ].map((link, i) => (
              <Col span={8} key={i}>
                <Card 
                  hoverable 
                  bodyStyle={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}
                  style={{ borderRadius: '12px', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
                >
                  {link.icon}
                  <Text style={{ fontSize: '0.7rem', color: '#595959', fontWeight: '500', lineHeight: 1.2 }}>{link.label}</Text>
                </Card>
              </Col>
            ))}
          </Row>

        </Col>
      </Row>

      {/* Available Trains / Booking Modal */}
      <Modal
        title={<span style={{ color: '#00234b', fontWeight: '700', fontSize: '1.2rem' }}>Available Trains for Booking</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={650}
        style={{ borderRadius: '16px' }}
      >
        <div style={{ padding: '10px 0' }}>
          <Text style={{ color: '#595959', fontSize: '0.9rem', marginBottom: '16px', display: 'block' }}>
            Select a train to confirm your reservation:
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {availableTrains.map((train) => (
              <div 
                key={train.id}
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: '1px solid #e8e8e8', 
                  display: 'flex', 
                  justify: 'space-between', 
                  alignItems: 'center',
                  background: '#fcfcfc'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text style={{ fontWeight: '700', fontSize: '1rem', color: '#00234b' }}>{train.trainName}</Text>
                    <Tag color="blue">{train.trainNumber}</Tag>
                    <Tag color="orange">{train.class}</Tag>
                  </div>
                  <Text style={{ color: '#595959', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                    {train.source} &rarr; {train.destination}
                  </Text>
                  <Text style={{ color: '#8c8c8c', fontSize: '0.8rem' }}>
                    Dep: {train.departureTime} &bull; Arr: {train.arrivalTime} ({train.duration})
                  </Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1890ff', display: 'block' }}>
                    ₹ {train.fare}
                  </Text>
                  <Button 
                    type="primary" 
                    onClick={() => handleConfirmBooking(train)}
                    style={{ marginTop: '6px', borderRadius: '6px', background: '#0d47a1', fontWeight: '600' }}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;


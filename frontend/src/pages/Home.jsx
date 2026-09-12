import React, { useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Table, Typography, Space, Row, Col } from 'antd';
import { Search, MapPin, Calendar, CreditCard, Clock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Home = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const navigate = useNavigate();

  const onSearch = async (values) => {
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/trains/search?from=${values.from}&to=${values.to}&date=${values.date.format('YYYY-MM-DD')}`);
      setTrains(data);
      setSearchParams(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      title: 'Train Details', 
      key: 'details', 
      render: (_, record) => (
        <div>
          <Title level={5} style={{ margin: 0, color: '#213d77' }}>{record.name} ({record.trainNumber})</Title>
          <Text type="secondary"><Clock size={12} style={{marginRight: 4}}/>Runs On: {record.runsOn.join(', ')}</Text>
        </div>
      )
    },
    { 
      title: 'Departure', 
      key: 'departs', 
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: '1.2rem' }}>{record.route.find(r => r.stationCode === searchParams?.from)?.departureTime}</Text>
          <br />
          <Text type="secondary">{searchParams?.from}</Text>
        </div>
      )
    },
    { 
      title: 'Arrival', 
      key: 'arrives', 
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: '1.2rem' }}>{record.route.find(r => r.stationCode === searchParams?.to)?.arrivalTime}</Text>
          <br />
          <Text type="secondary">{searchParams?.to}</Text>
        </div>
      )
    },
    { 
      title: 'Availability & Fare', 
      key: 'classes',
      render: (_, record) => (
        <Space wrap>
          {record.classes.map(c => (
            <Card 
              key={c.className} 
              size="small" 
              hoverable
              style={{ width: 120, textAlign: 'center', borderColor: '#d9d9d9', background: '#f9f9f9' }}
              bodyStyle={{ padding: '8px' }}
              onClick={() => navigate(`/book/${record._id}`, { state: { train: record, searchParams, selectedClass: c } })}
            >
              <Text strong style={{ display: 'block', color: '#213d77' }}>{c.className}</Text>
              <Text type="success" style={{ display: 'block', fontSize: '12px', margin: '4px 0' }}>AVAILABLE {c.totalSeats}</Text>
              <Text strong style={{ color: '#FB792B' }}>₹ {c.fare}</Text>
            </Card>
          ))}
        </Space>
      )
    },
  ];

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
                    <Input prefix={<MapPin size={18} color="#bfbfbf" />} placeholder="From (e.g. MMCT)" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="to" rules={[{ required: true, message: 'Destination required' }]}>
                    <Input prefix={<MapPin size={18} color="#bfbfbf" />} placeholder="To (e.g. NDLS)" />
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
          <Card 
            title={<Title level={3} style={{ color: '#213d77', margin: 0 }}>Train Availability ({trains.length} found)</Title>}
            bordered={false} 
            style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            <Table 
              dataSource={trains} 
              columns={columns} 
              rowKey="_id" 
              loading={loading}
              pagination={false}
              locale={{ emptyText: 'No trains found for this route.' }}
            />
          </Card>
        )}

        {!searched && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Title level={2} style={{ color: '#213d77' }}>Have you not found your train?</Title>
            <Text type="secondary" style={{ fontSize: '1.1rem' }}>Search for MMCT to NDLS or MMCT to ADI to see dummy trains!</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

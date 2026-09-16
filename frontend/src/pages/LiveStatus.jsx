import React, { useState } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Tag, 
  Spin, 
  message, 
  Radio,
  Tooltip
} from 'antd';
import { 
  Search, 
  Train, 
  Clock, 
  ArrowRight, 
  RotateCw, 
  Info, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  Layers,
  ArrowLeftRight
} from 'lucide-react';

const { Title, Text } = Typography;

// Mock database of live train status timelines
const MOCK_TRAIN_DATA = {
  '12650': {
    number: '12650',
    name: 'Kashi Express',
    source: 'New Delhi (NDLS)',
    destination: 'Varanasi Jn (BSB)',
    status: 'Running on Time',
    statusType: 'success',
    lastUpdated: '15 Sep 2025 | 14:32',
    departureTime: '21:15',
    arrivalTime: '05:30',
    duration: '8h 15m',
    distance: '709 km',
    schedule: [
      { station: 'New Delhi (NDLS)', isSource: true, arrDep: '21:15', actual: '21:20', delay: '+5m', delayColor: 'orange', status: 'Departed', statusColor: 'green' },
      { station: 'Kanpur Central (CNB)', arrDep: '01:50 / 01:55', actual: '01:52 / 01:58', delay: '+2m', delayColor: 'orange', status: 'On Time', statusColor: 'green' },
      { station: 'Prayagraj Jn (PRYJ)', arrDep: '03:45 / 03:50', actual: '03:47 / 03:52', delay: '+2m', delayColor: 'orange', status: 'On Time', statusColor: 'green' },
      { station: 'Mughalsarai Jn (MGS)', arrDep: '04:55 / 05:00', actual: '04:58 / 05:02', delay: '+2m', delayColor: 'orange', status: 'On Time', statusColor: 'green' },
      { station: 'Varanasi Jn (BSB)', isDest: true, arrDep: '05:30', actual: '-', delay: '-', status: 'On Time', statusColor: 'green' }
    ],
    coaches: ['ENG', 'SLR', 'GS', 'GS', 'B1', 'B2', 'B3', 'A1', 'H1', 'S1', 'S2', 'S3', 'SLR'],
    details: {
      type: 'Superfast Express',
      zone: 'Northern Railway (NR)',
      classes: '1A, 2A, 3A, SL, GN',
      pantry: 'Available (E-Catering)'
    }
  },
  '12951': {
    number: '12951',
    name: 'Mumbai Rajdhani Express',
    source: 'New Delhi (NDLS)',
    destination: 'Mumbai CSMT (BCT)',
    status: 'Running on Time',
    statusType: 'success',
    lastUpdated: '15 Sep 2025 | 14:40',
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    distance: '1384 km',
    schedule: [
      { station: 'New Delhi (NDLS)', isSource: true, arrDep: '16:55', actual: '16:55', delay: '0m', delayColor: 'green', status: 'Departed', statusColor: 'green' },
      { station: 'Kota Jn (KOTA)', arrDep: '21:40 / 21:50', actual: '21:40 / 21:50', delay: '0m', delayColor: 'green', status: 'Departed', statusColor: 'green' },
      { station: 'Ratlam Jn (RTM)', arrDep: '01:13 / 01:15', actual: '01:15 / 01:18', delay: '+2m', delayColor: 'orange', status: 'Departed', statusColor: 'green' },
      { station: 'Vadodara Jn (BRC)', arrDep: '04:20 / 04:30', actual: '04:20 / 04:30', delay: '0m', delayColor: 'green', status: 'Departed', statusColor: 'green' },
      { station: 'Mumbai Central (MMCT)', isDest: true, arrDep: '08:35', actual: '08:35', delay: '0m', delayColor: 'green', status: 'On Time', statusColor: 'green' }
    ],
    coaches: ['ENG', 'H1', 'A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'PC', 'B5', 'EOG'],
    details: {
      type: 'Rajdhani Express',
      zone: 'Western Railway (WR)',
      classes: '1A, 2A, 3A',
      pantry: 'Complimentary Catering Included'
    }
  },
  '20685': {
    number: '20685',
    name: 'Vande Bharat Express',
    source: 'Chennai Central (MAS)',
    destination: 'KSR Bengaluru (SBC)',
    status: 'Running 10m Late',
    statusType: 'warning',
    lastUpdated: '15 Sep 2025 | 14:45',
    departureTime: '05:50',
    arrivalTime: '10:15',
    duration: '4h 25m',
    distance: '359 km',
    schedule: [
      { station: 'Chennai Central (MAS)', isSource: true, arrDep: '05:50', actual: '06:00', delay: '+10m', delayColor: 'red', status: 'Departed', statusColor: 'green' },
      { station: 'Katpadi Jn (KPD)', arrDep: '07:13 / 07:15', actual: '07:23 / 07:25', delay: '+10m', delayColor: 'red', status: 'Departed', statusColor: 'green' },
      { station: 'Krishnarajapuram (KJM)', arrDep: '09:38 / 09:40', actual: '09:48 / 09:50', delay: '+10m', delayColor: 'red', status: 'On Time', statusColor: 'green' },
      { station: 'KSR Bengaluru (SBC)', isDest: true, arrDep: '10:15', actual: '10:25', delay: '+10m', delayColor: 'red', status: 'Upcoming', statusColor: 'blue' }
    ],
    coaches: ['D1', 'C1', 'C2', 'C3', 'C4', 'E1', 'C5', 'D2'],
    details: {
      type: 'Vande Bharat Express',
      zone: 'Southern Railway (SR)',
      classes: 'EC, CC',
      pantry: 'Catering Included'
    }
  }
};

const LiveStatus = () => {
  const [searchMode, setSearchMode] = useState('number');
  const [trainInput, setTrainInput] = useState('12650');
  const [activeSubTab, setActiveSubTab] = useState('live');
  const [loading, setLoading] = useState(false);
  const [currentTrain, setCurrentTrain] = useState(MOCK_TRAIN_DATA['12650']);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());

  const handleSearch = (query = trainInput) => {
    const cleaned = (query || '').trim();
    if (!cleaned) {
      return message.warning('Please enter a valid Train Number or Name');
    }

    setLoading(true);
    setTimeout(() => {
      // Lookup match or generate dynamic fallback train
      const matchedKey = Object.keys(MOCK_TRAIN_DATA).find(
        (k) => k === cleaned || MOCK_TRAIN_DATA[k].name.toLowerCase().includes(cleaned.toLowerCase())
      );

      if (matchedKey) {
        setCurrentTrain(MOCK_TRAIN_DATA[matchedKey]);
        message.success(`Live status retrieved for ${MOCK_TRAIN_DATA[matchedKey].name}`);
      } else {
        // Fallback dynamic generator for any valid train number query
        const generated = {
          number: cleaned.match(/\d+/) ? cleaned.match(/\d+/)[0] : '12002',
          name: cleaned.length > 5 ? cleaned : 'Superfast Express',
          source: 'New Delhi (NDLS)',
          destination: 'Varanasi Jn (BSB)',
          status: 'Running on Time',
          statusType: 'success',
          lastUpdated: 'Just Now',
          departureTime: '06:00',
          arrivalTime: '14:05',
          duration: '8h 05m',
          distance: '755 km',
          schedule: [
            { station: 'New Delhi (NDLS)', isSource: true, arrDep: '06:00', actual: '06:00', delay: '0m', delayColor: 'green', status: 'Departed', statusColor: 'green' },
            { station: 'Kanpur Central (CNB)', arrDep: '10:10 / 10:15', actual: '10:12 / 10:17', delay: '+2m', delayColor: 'orange', status: 'On Time', statusColor: 'green' },
            { station: 'Prayagraj Jn (PRYJ)', arrDep: '12:30 / 12:35', actual: '12:32 / 12:37', delay: '+2m', delayColor: 'orange', status: 'On Time', statusColor: 'green' },
            { station: 'Varanasi Jn (BSB)', isDest: true, arrDep: '14:05', actual: '14:05', delay: '0m', delayColor: 'green', status: 'On Time', statusColor: 'green' }
          ],
          coaches: ['ENG', 'GS', 'GS', 'B1', 'B2', 'A1', 'S1', 'S2', 'SLR'],
          details: { type: 'Superfast Express', zone: 'Northern Railway', classes: '2A, 3A, SL', pantry: 'Available' }
        };
        setCurrentTrain(generated);
        message.info(`Showing live status for Train ${generated.number} - ${generated.name}`);
      }
      setLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString());
    }, 350);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString());
      message.success('Live status updated in real-time');
    }, 300);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* 1. Header Banner Card */}
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
            alt="Live Train Banner"
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
              Live Train Running Status
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
              Get real-time updates on your train's location, arrival and departure times.
            </Text>
          </div>
        </div>
      </div>

      {/* 2. Search Input Section Card */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}
        bodyStyle={{ padding: '24px' }}
      >
        {/* Toggle Mode Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Button 
            type={searchMode === 'number' ? 'primary' : 'default'}
            onClick={() => setSearchMode('number')}
            style={{ borderRadius: '8px', fontWeight: '600' }}
          >
            Train Number
          </Button>
          <Button 
            type={searchMode === 'name' ? 'primary' : 'default'}
            onClick={() => setSearchMode('name')}
            style={{ borderRadius: '8px', fontWeight: '600' }}
          >
            Train Name
          </Button>
        </div>

        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeftRight size={16} color="#1890ff" />
          <Text strong style={{ fontSize: '0.92rem', color: '#1e293b' }}>
            {searchMode === 'number' ? 'Enter Train Number' : 'Enter Train Name'}
          </Text>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Input 
            size="large"
            placeholder={searchMode === 'number' ? 'e.g. 12650, 12951, 20685' : 'e.g. Kashi Express, Rajdhani'}
            value={trainInput}
            onChange={(e) => setTrainInput(e.target.value)}
            onPressEnter={() => handleSearch(trainInput)}
            prefix={<Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />}
            style={{ borderRadius: '12px', height: '48px', fontSize: '1rem' }}
          />
          <Button 
            type="primary"
            size="large"
            onClick={() => handleSearch(trainInput)}
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
            <Search size={18} /> Check Status
          </Button>
        </div>

        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Text type="secondary" style={{ fontSize: '0.8rem', fontWeight: '600' }}>Quick Trains:</Text>
          {[
            { num: '12650', label: '12650 - Kashi Express' },
            { num: '12951', label: '12951 - Mumbai Rajdhani' },
            { num: '20685', label: '20685 - Vande Bharat' }
          ].map((t) => (
            <Tag 
              key={t.num} 
              color="blue" 
              style={{ cursor: 'pointer', borderRadius: '6px', padding: '2px 10px', fontWeight: '600' }}
              onClick={() => {
                setTrainInput(t.num);
                handleSearch(t.num);
              }}
            >
              {t.label}
            </Tag>
          ))}
        </div>
      </Card>

      {/* 3. Train Overview Live Status Card */}
      {loading ? (
        <Card style={{ borderRadius: '20px', textAlign: 'center', padding: '60px' }}>
          <Spin size="large" />
          <Text style={{ display: 'block', marginTop: '16px', color: '#64748b' }}>
            Fetching real-time train running status...
          </Text>
        </Card>
      ) : currentTrain ? (
        <div>
          <Card 
            bordered={false} 
            style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div 
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    backgroundColor: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #bbdefb'
                  }}
                >
                  <Train size={30} color="#0d47a1" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Title level={3} style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>
                      {currentTrain.number}
                    </Title>
                    <Title level={3} style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>
                      {currentTrain.name}
                    </Title>
                    <Tag 
                      color="green" 
                      style={{
                        borderRadius: '12px',
                        padding: '3px 12px',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        backgroundColor: '#e6f4ea',
                        color: '#137333',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <CheckCircle2 size={14} /> {currentTrain.status}
                    </Tag>
                  </div>
                  <Text style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '500', marginTop: '2px', display: 'block' }}>
                    {currentTrain.source} → {currentTrain.destination}
                  </Text>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Last Updated</Text>
                <Text strong style={{ fontSize: '0.9rem', color: '#334155' }}>
                  {currentTrain.lastUpdated}
                </Text>
              </div>
            </div>

            {/* 4 Details Column Grid */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '20px 24px', border: '1px solid #f1f5f9' }}>
              <Row gutter={[24, 16]}>
                <Col xs={12} sm={6}>
                  <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Departure</Text>
                  <Text strong style={{ fontSize: '1.25rem', color: '#1e293b', display: 'block' }}>
                    {currentTrain.departureTime}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.76rem' }}>{currentTrain.source}</Text>
                </Col>

                <Col xs={12} sm={6}>
                  <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Arrival</Text>
                  <Text strong style={{ fontSize: '1.25rem', color: '#1e293b', display: 'block' }}>
                    {currentTrain.arrivalTime}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.76rem' }}>{currentTrain.destination}</Text>
                </Col>

                <Col xs={12} sm={6}>
                  <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Travel Duration</Text>
                  <Text strong style={{ fontSize: '1.25rem', color: '#1e293b', display: 'block' }}>
                    {currentTrain.duration}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.76rem' }}>Direct Route</Text>
                </Col>

                <Col xs={12} sm={6}>
                  <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block' }}>Distance</Text>
                  <Text strong style={{ fontSize: '1.25rem', color: '#1e293b', display: 'block' }}>
                    {currentTrain.distance}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '0.76rem' }}>Total Distance</Text>
                </Col>
              </Row>
            </div>
          </Card>

          {/* 4. Sub-Tabs Section */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {[
              { key: 'live', label: 'Live Running Status' },
              { key: 'schedule', label: 'Schedule' },
              { key: 'details', label: 'Train Details' },
              { key: 'coach', label: 'Coach Position' }
            ].map((tab) => (
              <Button 
                key={tab.key}
                type={activeSubTab === tab.key ? 'primary' : 'default'}
                onClick={() => setActiveSubTab(tab.key)}
                style={{
                  borderRadius: '10px',
                  fontWeight: '600',
                  height: '40px',
                  padding: '0 20px',
                  backgroundColor: activeSubTab === tab.key ? '#1890ff' : '#ffffff'
                }}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content View */}
          {activeSubTab === 'live' || activeSubTab === 'schedule' ? (
            <Card 
              bordered={false} 
              style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
              bodyStyle={{ padding: '0' }}
            >
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8fafc', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <Text strong style={{ color: '#475569', fontSize: '0.85rem' }}>Station</Text>
                <div style={{ display: 'flex', gap: '40px' }}>
                  <Text strong style={{ color: '#475569', fontSize: '0.85rem' }}>Arr/Dep Time</Text>
                  <Text strong style={{ color: '#475569', fontSize: '0.85rem' }}>Actual Time</Text>
                  <Text strong style={{ color: '#475569', fontSize: '0.85rem' }}>Delay</Text>
                  <Text strong style={{ color: '#475569', fontSize: '0.85rem', width: '80px', textAlign: 'center' }}>Status</Text>
                </div>
              </div>

              {/* Station Timeline List */}
              <div style={{ padding: '12px 24px' }}>
                {currentTrain.schedule.map((item, idx) => {
                  const isLast = idx === currentTrain.schedule.length - 1;
                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px 0',
                        borderBottom: isLast ? 'none' : '1px solid #f1f5f9',
                        position: 'relative'
                      }}
                    >
                      {/* Timeline Station Node & Name */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                        {/* Connecting Line */}
                        {!isLast && (
                          <div 
                            style={{
                              position: 'absolute',
                              top: '28px',
                              left: '9px',
                              width: '2px',
                              height: '42px',
                              backgroundColor: '#1890ff',
                              zIndex: 1
                            }}
                          />
                        )}
                        <div 
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: item.status === 'Departed' ? '#1890ff' : '#52c41a',
                            border: '4px solid #e6f0fa',
                            zIndex: 2
                          }}
                        />
                        <div>
                          <Text strong style={{ fontSize: '0.98rem', color: '#1e293b', display: 'block' }}>
                            {item.station}
                          </Text>
                          <Text type="secondary" style={{ fontSize: '0.78rem' }}>
                            {item.isSource ? 'Departure' : (item.isDest ? 'Arrival' : 'Arrival / Departure')}
                          </Text>
                        </div>
                      </div>

                      {/* Right Columns Data */}
                      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                        <Text strong style={{ fontSize: '0.9rem', color: '#334155', minWidth: '90px' }}>
                          {item.arrDep}
                        </Text>
                        <Text strong style={{ fontSize: '0.9rem', color: '#334155', minWidth: '90px' }}>
                          {item.actual}
                        </Text>
                        <Tag 
                          color={item.delayColor || 'orange'} 
                          style={{ 
                            borderRadius: '6px', 
                            fontWeight: '700', 
                            minWidth: '45px', 
                            textAlign: 'center',
                            border: 'none'
                          }}
                        >
                          {item.delay}
                        </Tag>
                        <Tag 
                          color={item.statusColor || 'green'} 
                          style={{ 
                            borderRadius: '6px', 
                            fontWeight: '700', 
                            minWidth: '80px', 
                            textAlign: 'center',
                            padding: '3px 10px',
                            border: 'none'
                          }}
                        >
                          {item.status}
                        </Tag>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : activeSubTab === 'coach' ? (
            <Card style={{ borderRadius: '20px', padding: '20px' }}>
              <Title level={4} style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Coach Composition</Title>
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px' }}>
                {currentTrain.coaches.map((c, i) => (
                  <div 
                    key={i} 
                    style={{
                      minWidth: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      backgroundColor: c.startsWith('B') ? '#1890ff' : (c.startsWith('A') ? '#722ed1' : '#f50'),
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700'
                    }}
                  >
                    <Train size={16} />
                    <span style={{ fontSize: '0.82rem' }}>{c}</span>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card style={{ borderRadius: '20px', padding: '24px' }}>
              <Title level={4} style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Train Technical Details</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}><Text type="secondary">Type:</Text> <Text strong>{currentTrain.details.type}</Text></Col>
                <Col span={12}><Text type="secondary">Zone:</Text> <Text strong>{currentTrain.details.zone}</Text></Col>
                <Col span={12}><Text type="secondary">Classes:</Text> <Text strong>{currentTrain.details.classes}</Text></Col>
                <Col span={12}><Text type="secondary">Pantry:</Text> <Text strong>{currentTrain.details.pantry}</Text></Col>
              </Row>
            </Card>
          )}

          {/* 5. Bottom Live Alert Notice Bar */}
          <div 
            style={{
              backgroundColor: '#e6f7ff',
              border: '1px solid #91d5ff',
              borderRadius: '14px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 10px rgba(24,144,255,0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info size={20} color="#1890ff" />
              <Text style={{ color: '#0050b3', fontSize: '0.88rem' }}>
                The live status is updated in real-time. Please check again for the latest information.
              </Text>
            </div>

            <Button 
              type="link" 
              icon={<RotateCw size={16} />}
              onClick={handleRefresh}
              style={{ color: '#1890ff', fontWeight: '700', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Refresh ({lastRefreshed})
            </Button>
          </div>

        </div>
      ) : null}

    </div>
  );
};

export default LiveStatus;

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Table, Tag, Button, Modal, Input, Form, message, Progress } from 'antd';
import { 
  Train, 
  Ticket, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Plus, 
  RefreshCw,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { MASTER_TRAINS, INDIAN_STATIONS } from '../../utils/railwayData';
import useBookingStore from '../../store/useBookingStore';

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const bookings = useBookingStore(state => state.bookings);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeText, setNoticeText] = useState('Train services operating on time. Special festive trains added on Patna - Delhi route.');
  const [activeNotice, setActiveNotice] = useState('Train services operating on time. Special festive trains added on Patna - Delhi route.');

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalFare || 450), 128450);
  const totalBookings = bookings.length + 342;

  const handleBroadcastNotice = () => {
    if (!noticeText.trim()) {
      message.error('Please enter notice text');
      return;
    }
    setActiveNotice(noticeText);
    setIsNoticeModalOpen(false);
    message.success('Emergency Notice Broadcasted to all passenger screens!');
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* PAGE HEADER & QUICK ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '900', letterSpacing: '-0.5px' }}>
            Operations Control Dashboard
          </Title>
          <Text style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Real-time Monitoring & Management Console for Indian Railways Platform
          </Text>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button 
            type="primary" 
            onClick={() => setIsNoticeModalOpen(true)}
            icon={<Bell size={16} />}
            style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#7c3aed', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)' }}
          >
            Broadcast Passenger Notice
          </Button>
          <Button 
            icon={<RefreshCw size={16} />}
            onClick={() => message.success('System metrics synchronized with IRCTC servers')}
            style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
          >
            Sync Metrics
          </Button>
        </div>
      </div>

      {/* ACTIVE BROADCAST ALERT BANNER */}
      {activeNotice && (
        <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '12px', padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#7c3aed', borderRadius: '50%', padding: '6px', color: '#fff' }}>
              <Bell size={18} />
            </div>
            <div>
              <Text style={{ color: '#fbbf24', fontWeight: '800', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ACTIVE PASSENGER ADVISORY BROADCAST
              </Text>
              <Text style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: '500' }}>
                "{activeNotice}"
              </Text>
            </div>
          </div>
          <Button size="small" type="link" onClick={() => setIsNoticeModalOpen(true)} style={{ color: '#a78bfa', fontWeight: '700' }}>
            Update &rarr;
          </Button>
        </div>
      )}

      {/* KPI STATS CARDS */}
      <Row gutter={[20, 20]} style={{ marginBottom: '28px' }}>
        
        {/* Total Revenue Card */}
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Total Revenue</Text>
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: '8px', borderRadius: '10px', color: '#4ade80' }}>
                <IndianRupee size={20} />
              </div>
            </div>
            <Title level={3} style={{ color: '#ffffff', margin: 0, fontWeight: '900', fontSize: '1.8rem' }}>
              ₹ {totalRevenue.toLocaleString('en-IN')}
            </Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <TrendingUp size={14} color="#4ade80" />
              <Text style={{ color: '#4ade80', fontSize: '0.78rem', fontWeight: '700' }}>+18.4% this month</Text>
            </div>
          </Card>
        </Col>

        {/* Total Bookings Card */}
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Bookings Processed</Text>
              <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', padding: '8px', borderRadius: '10px', color: '#60a5fa' }}>
                <Ticket size={20} />
              </div>
            </div>
            <Title level={3} style={{ color: '#ffffff', margin: 0, fontWeight: '900', fontSize: '1.8rem' }}>
              {totalBookings.toLocaleString('en-IN')}
            </Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <CheckCircle2 size={14} color="#60a5fa" />
              <Text style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: '700' }}>99.2% Success Rate</Text>
            </div>
          </Card>
        </Col>

        {/* Active Trains Operating Card */}
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Operating Trains</Text>
              <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', padding: '8px', borderRadius: '10px', color: '#c084fc' }}>
                <Train size={20} />
              </div>
            </div>
            <Title level={3} style={{ color: '#ffffff', margin: 0, fontWeight: '900', fontSize: '1.8rem' }}>
              {MASTER_TRAINS.length * 8 + 12}
            </Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <Zap size={14} color="#c084fc" />
              <Text style={{ color: '#c084fc', fontSize: '0.78rem', fontWeight: '700' }}>14 Vande Bharat Rakes</Text>
            </div>
          </Card>
        </Col>

        {/* Passenger Verification Metric */}
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Aadhaar Verification</Text>
              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', padding: '8px', borderRadius: '10px', color: '#fcd34d' }}>
                <ShieldCheck size={20} />
              </div>
            </div>
            <Title level={3} style={{ color: '#ffffff', margin: 0, fontWeight: '900', fontSize: '1.8rem' }}>
              98.6%
            </Title>
            <div style={{ marginTop: '8px' }}>
              <Progress percent={98.6} showInfo={false} strokeColor="#fbbf24" trailColor="#334155" size="small" />
            </div>
          </Card>
        </Col>

      </Row>

      {/* RECENT OPERATIONAL TRAINS MONITOR & LIVE NETWORK TABLE */}
      <Row gutter={[24, 24]}>
        
        {/* Left Column: Train Schedules & Status Control */}
        <Col xs={24} lg={16}>
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Title level={4} style={{ color: '#ffffff', margin: 0, fontWeight: '800' }}>
                Live Railway Network Monitor
              </Title>
              <Tag color="purple" style={{ fontWeight: '700', borderRadius: '6px' }}>
                Master Schedule Registry
              </Tag>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {MASTER_TRAINS.slice(0, 5).map((t, idx) => (
                <div 
                  key={t.id || idx}
                  style={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)', padding: '10px', borderRadius: '10px', color: '#c084fc' }}>
                      <Train size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '1rem' }}>{t.trainName}</Text>
                        <Tag color="blue" style={{ border: 'none', fontWeight: '700' }}>#{t.trainNumber}</Tag>
                      </div>
                      <Text style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '2px', display: 'block' }}>
                        {t.departureCity} ({t.departureStation}) &rarr; {t.arrivalCity} ({t.arrivalStation}) &bull; Dep: {t.departureTime}
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Tag color="success" style={{ padding: '4px 10px', fontWeight: '700', borderRadius: '6px' }}>
                      ON TIME
                    </Tag>
                    <Button 
                      size="small" 
                      onClick={() => message.info(`Status updated for Train #${t.trainNumber}`)}
                      style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #475569', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}
                    >
                      Update Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Right Column: Platform Quick Info & Station Nodes */}
        <Col xs={24} lg={8}>
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', marginBottom: '24px' }}
            bodyStyle={{ padding: '24px' }}
          >
            <Title level={4} style={{ color: '#ffffff', margin: 0, marginBottom: '16px', fontWeight: '800' }}>
              Station Nodes Overview
            </Title>
            <Text style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '20px' }}>
              Current active railway junction nodes indexed in RailSetu:
            </Text>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {INDIAN_STATIONS.slice(0, 6).map((st) => (
                <div key={st.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #1e293b' }}>
                  <div>
                    <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem' }}>{st.name}</Text>
                    <Text style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>{st.state} &bull; Zone: {st.zone}</Text>
                  </div>
                  <Tag color="purple" style={{ fontWeight: '800', border: 'none' }}>{st.code}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>

      </Row>

      {/* BROADCAST NOTICE MODAL */}
      <Modal
        title={<span style={{ color: '#7c3aed', fontWeight: '800', fontSize: '1.2rem' }}>Broadcast Emergency Advisory Notice</span>}
        open={isNoticeModalOpen}
        onCancel={() => setIsNoticeModalOpen(false)}
        onOk={handleBroadcastNotice}
        okText="Broadcast to Passengers"
        okButtonProps={{ style: { backgroundColor: '#7c3aed', fontWeight: '700' } }}
        centered
        width={550}
      >
        <div style={{ padding: '10px 0' }}>
          <Text style={{ color: '#595959', fontSize: '0.9rem', marginBottom: '12px', display: 'block' }}>
            Enter the message to broadcast across all passenger dashboards:
          </Text>
          <Input.TextArea 
            rows={4}
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            placeholder="Type advisory notice..."
            style={{ borderRadius: '10px' }}
          />
        </div>
      </Modal>

    </div>
  );
};

export default AdminDashboard;

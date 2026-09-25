import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Input, Button, Space, message, Popconfirm } from 'antd';
import { Ticket, Search, CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react';
import useBookingStore from '../../store/useBookingStore';

const { Title, Text } = Typography;

const AdminBookings = () => {
  const bookings = useBookingStore(state => state.bookings);
  const cancelBooking = useBookingStore(state => state.cancelBooking);
  const [searchText, setSearchText] = useState('');

  const filteredBookings = bookings.filter(b => 
    b.pnr.includes(searchText) ||
    b.trainName.toLowerCase().includes(searchText.toLowerCase()) ||
    (b.passengerName && b.passengerName.toLowerCase().includes(searchText.toLowerCase())) ||
    b.source.toLowerCase().includes(searchText.toLowerCase()) ||
    b.destination.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCancelByAdmin = (id) => {
    cancelBooking(id);
    message.success('Booking cancelled and refund initiated by Admin');
  };

  const columns = [
    {
      title: 'PNR Number',
      dataIndex: 'pnr',
      key: 'pnr',
      render: (text) => (
        <Text style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.95rem' }}>{text}</Text>
      )
    },
    {
      title: 'Passenger & Contact',
      key: 'passenger',
      render: (record) => (
        <div>
          <Text style={{ color: '#ffffff', fontWeight: '800', display: 'block' }}>
            {record.passengerName || 'Ashu'}
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>
            Mob: {record.mobileNumber || '+91 9876543210'}
          </Text>
        </div>
      )
    },
    {
      title: 'Train & Route',
      key: 'train',
      render: (record) => (
        <div>
          <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.88rem', display: 'block' }}>
            {record.trainName} (#{record.trainNumber})
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>
            {record.source} &rarr; {record.destination}
          </Text>
        </div>
      )
    },
    {
      title: 'Class & Fare',
      key: 'fare',
      render: (record) => (
        <div>
          <Tag color="purple" style={{ fontWeight: '700', border: 'none' }}>{record.className || '3AC'}</Tag>
          <Text style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.9rem', marginLeft: '6px' }}>
            ₹ {record.totalFare || 1210}
          </Text>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'CONFIRMED' ? 'success' : 'error'} style={{ fontWeight: '700', borderRadius: '6px' }}>
          {status || 'CONFIRMED'}
        </Tag>
      )
    },
    {
      title: 'Admin Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          {record.status !== 'CANCELLED' && (
            <Popconfirm
              title="Cancel this passenger ticket?"
              onConfirm={() => handleCancelByAdmin(record._id || record.id)}
              okText="Yes, Cancel Ticket"
              cancelText="Close"
            >
              <Button size="small" type="primary" danger style={{ borderRadius: '6px', fontWeight: '600', fontSize: '0.75rem' }}>
                Cancel Ticket
              </Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '900', letterSpacing: '-0.5px' }}>
            Passenger Booking Registry
          </Title>
          <Text style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            System-wide Passenger Ticket Reservations, Status Auditing & Cancellations
          </Text>
        </div>

        <Button 
          icon={<Download size={16} />}
          onClick={() => message.success('Booking registry report generated')}
          style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
        >
          Export CSV Report
        </Button>
      </div>

      {/* FILTER CARD */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }}
        bodyStyle={{ padding: '16px 20px' }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Input 
            prefix={<Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />}
            placeholder="Search by PNR, Passenger Name, Train Name, or City..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', height: '42px' }}
          />
          <Text style={{ color: '#94a3b8', fontWeight: '700', whiteSpace: 'nowrap' }}>
            {filteredBookings.length} Active Tickets
          </Text>
        </div>
      </Card>

      {/* BOOKINGS TABLE */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155' }}
        bodyStyle={{ padding: '0' }}
      >
        <Table 
          columns={columns}
          dataSource={filteredBookings}
          rowKey={(record, index) => record._id || record.id || index}
          pagination={{ pageSize: 8 }}
          style={{ backgroundColor: 'transparent' }}
        />
      </Card>

    </div>
  );
};

export default AdminBookings;

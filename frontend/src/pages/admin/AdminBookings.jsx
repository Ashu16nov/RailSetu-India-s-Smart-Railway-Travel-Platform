import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Input, Button, Space, message, Modal, Form, Select, Popconfirm } from 'antd';
import { Ticket, Search, Plus, Edit, Trash2, Download, CheckCircle, XCircle } from 'lucide-react';
import useBookingStore from '../../store/useBookingStore';

const { Title, Text } = Typography;

const AdminBookings = () => {
  const bookings = useBookingStore(state => state.bookings);
  const addBooking = useBookingStore(state => state.addBooking);
  const updateBooking = useBookingStore(state => state.updateBooking);
  const deleteBooking = useBookingStore(state => state.deleteBooking);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const handleCreateOrUpdate = (values) => {
    if (editingBooking) {
      updateBooking(editingBooking._id || editingBooking.id || editingBooking.pnr, values);
      message.success(`Booking PNR ${editingBooking.pnr} updated successfully!`);
    } else {
      addBooking(values);
      message.success('New Ticket Reservation created by Admin!');
    }
    setIsModalOpen(false);
    setEditingBooking(null);
    form.resetFields();
  };

  const handleEditClick = (record) => {
    setEditingBooking(record);
    form.setFieldsValue({
      passengerName: record.passengerName || 'Ashu',
      mobileNumber: record.mobileNumber || '+91 9876543210',
      trainName: record.trainName,
      trainNumber: record.trainNumber,
      source: record.source,
      destination: record.destination,
      journeyDate: record.journeyDate,
      className: record.className || '3AC',
      status: record.status || 'CONFIRMED',
      totalFare: record.totalFare || 1210
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, pnr) => {
    deleteBooking(id);
    message.success(`Booking PNR ${pnr} deleted from system`);
  };

  const filteredBookings = bookings.filter(b => 
    b.pnr.includes(searchText) ||
    b.trainName.toLowerCase().includes(searchText.toLowerCase()) ||
    (b.passengerName && b.passengerName.toLowerCase().includes(searchText.toLowerCase())) ||
    b.source.toLowerCase().includes(searchText.toLowerCase()) ||
    b.destination.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'PNR Number',
      dataIndex: 'pnr',
      key: 'pnr',
      render: (text) => (
        <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1rem', letterSpacing: '0.5px' }}>{text}</div>
      )
    },
    {
      title: 'Passenger & Contact',
      key: 'passenger',
      render: (record) => (
        <div>
          <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1rem', lineHeight: '1.2' }}>
            {record.passengerName || record.passenger?.name || 'Ashu'}
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '2px' }}>
            Mob: {record.mobileNumber || record.passenger?.mobile || '+91 9876543210'}
          </div>
        </div>
      )
    },
    {
      title: 'Train & Route',
      key: 'train',
      render: (record) => (
        <div>
          <div style={{ color: '#c084fc', fontWeight: '800', fontSize: '0.95rem', lineHeight: '1.2' }}>
            {record.trainName || 'Express Train'} (#{record.trainNumber || '12393'})
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '2px' }}>
            {record.source} &rarr; {record.destination} &bull; {record.journeyDate}
          </div>
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
        <Tag color={status === 'CONFIRMED' ? 'success' : (status === 'CANCELLED' ? 'error' : 'warning')} style={{ fontWeight: '700', borderRadius: '6px' }}>
          {status || 'CONFIRMED'}
        </Tag>
      )
    },
    {
      title: 'Admin Actions',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button 
            size="small" 
            type="link"
            icon={<Edit size={16} />}
            onClick={() => handleEditClick(record)}
            style={{ color: '#60a5fa' }}
          />
          <Popconfirm
            title={`Delete PNR ${record.pnr} from database?`}
            onConfirm={() => handleDelete(record._id || record.id || record.pnr, record.pnr)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button size="small" type="link" danger icon={<Trash2 size={16} />} />
          </Popconfirm>
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
            System-wide Ticket Reservations, Full CRUD Management, Status Auditing & Cancellations
          </Text>
        </div>

        <Space size="middle">
          <Button 
            type="primary"
            icon={<Plus size={18} />}
            onClick={() => {
              setEditingBooking(null);
              form.resetFields();
              setIsModalOpen(true);
            }}
            style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#7c3aed', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)' }}
          >
            Create New Reservation
          </Button>
          <Button 
            icon={<Download size={16} />}
            onClick={() => message.success('Booking registry report exported')}
            style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
          >
            Export CSV
          </Button>
        </Space>
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
          className="admin-dark-table"
          columns={columns}
          dataSource={filteredBookings}
          rowKey={(record, index) => record._id || record.id || record.pnr || index}
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* CREATE / EDIT BOOKING MODAL */}
      <Modal
        title={<span style={{ color: '#7c3aed', fontWeight: '800', fontSize: '1.2rem' }}>{editingBooking ? 'Edit Reservation Record' : 'Create New Ticket Reservation'}</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate} style={{ marginTop: '16px' }}>
          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="passengerName" label="Passenger Name" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="Ashu" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="+91 9876543210" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="trainName" label="Train Name" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="Sampoorna Kranti Express" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="trainNumber" label="Train Number" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="12393" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="source" label="Source Station" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="Patna Junction (PNBE)" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="destination" label="Destination Station" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="New Delhi (NDLS)" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="className" label="Class" style={{ flex: 1 }}>
              <Select style={{ borderRadius: '8px' }} options={[
                { value: '3AC', label: 'AC 3 Tier (3A)' },
                { value: '2AC', label: 'AC 2 Tier (2A)' },
                { value: '1AC', label: 'AC 1st Class (1A)' },
                { value: 'SL', label: 'Sleeper (SL)' }
              ]} />
            </Form.Item>
            <Form.Item name="status" label="Reservation Status" style={{ flex: 1 }}>
              <Select style={{ borderRadius: '8px' }} options={[
                { value: 'CONFIRMED', label: 'CONFIRMED' },
                { value: 'RAC', label: 'RAC (Reservation Against Cancellation)' },
                { value: 'WAITLISTED', label: 'WAITLISTED' },
                { value: 'CANCELLED', label: 'CANCELLED' }
              ]} />
            </Form.Item>
            <Form.Item name="totalFare" label="Fare (₹)" style={{ flex: 1 }}>
              <Input type="number" placeholder="1360" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#7c3aed', fontWeight: '700' }}>
              {editingBooking ? 'Save Reservation Changes' : 'Create Reservation'}
            </Button>
          </div>
        </Form>
      </Modal>

    </div>
  );
};

export default AdminBookings;

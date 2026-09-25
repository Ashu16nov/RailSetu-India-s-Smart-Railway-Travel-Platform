import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Button, Modal, Form, Input, Select, message, Space, Popconfirm } from 'antd';
import { Train, Plus, Edit, Trash2, Search, CheckCircle, Clock, AlertTriangle, Shield } from 'lucide-react';
import { MASTER_TRAINS, INDIAN_STATIONS } from '../../utils/railwayData';

const { Title, Text } = Typography;

const AdminTrains = () => {
  const [trainsList, setTrainsList] = useState(MASTER_TRAINS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const handleAddTrain = (values) => {
    const newTrain = {
      id: `custom-${Date.now()}`,
      trainNumber: values.trainNumber,
      trainName: values.trainName,
      departureStation: values.departureStation.toUpperCase(),
      departureCity: values.departureCity || values.departureStation,
      arrivalStation: values.arrivalStation.toUpperCase(),
      arrivalCity: values.arrivalCity || values.arrivalStation,
      departureTime: values.departureTime || '08:00',
      arrivalTime: values.arrivalTime || '16:00',
      duration: values.duration || '8h 00m',
      classes: values.classes || 'Sleeper | AC 3 Tier | AC 2 Tier',
      isPopular: true,
      runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      fares: {
        SL: parseInt(values.fareSL) || 350,
        '3A': parseInt(values.fare3A) || 1250,
        '2A': parseInt(values.fare2A) || 1850
      }
    };

    setTrainsList([newTrain, ...trainsList]);
    setIsAddModalOpen(false);
    form.resetFields();
    message.success(`New Train ${newTrain.trainName} (#${newTrain.trainNumber}) added to database!`);
  };

  const handleDeleteTrain = (id) => {
    setTrainsList(trainsList.filter(t => t.id !== id));
    message.success('Train schedule deleted successfully');
  };

  const filteredTrains = trainsList.filter(t => 
    t.trainName.toLowerCase().includes(searchText.toLowerCase()) ||
    t.trainNumber.includes(searchText) ||
    t.departureStation.toLowerCase().includes(searchText.toLowerCase()) ||
    t.arrivalStation.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Train Details',
      dataIndex: 'trainName',
      key: 'trainName',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)', padding: '8px', borderRadius: '8px', color: '#c084fc' }}>
            <Train size={18} />
          </div>
          <div>
            <Text style={{ color: '#ffffff', fontWeight: '800', display: 'block', fontSize: '0.95rem' }}>{text}</Text>
            <Tag color="blue" style={{ border: 'none', fontWeight: '700', fontSize: '0.72rem' }}>#{record.trainNumber}</Tag>
          </div>
        </div>
      )
    },
    {
      title: 'Route',
      key: 'route',
      render: (record) => (
        <div>
          <Text style={{ color: '#f8fafc', fontWeight: '700', fontSize: '0.85rem' }}>
            {record.departureCity} ({record.departureStation}) &rarr; {record.arrivalCity} ({record.arrivalStation})
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>
            Dep: {record.departureTime} | Arr: {record.arrivalTime} ({record.duration})
          </Text>
        </div>
      )
    },
    {
      title: 'Available Fares',
      key: 'fares',
      render: (record) => (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {record.fares && Object.entries(record.fares).map(([cls, fare]) => (
            <Tag key={cls} color="purple" style={{ border: 'none', fontWeight: '700' }}>
              {cls}: ₹{fare}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: () => (
        <Tag color="success" style={{ fontWeight: '700', borderRadius: '6px' }}>
          Operational
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space size="middle">
          <Button 
            size="small" 
            type="link"
            onClick={() => message.info(`Editing Train #${record.trainNumber}`)}
            icon={<Edit size={15} />} 
            style={{ color: '#60a5fa' }} 
          />
          <Popconfirm
            title="Delete this train from database?"
            onConfirm={() => handleDeleteTrain(record.id)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button size="small" type="link" danger icon={<Trash2 size={15} />} />
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
            Train Master Database
          </Title>
          <Text style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Add, Edit, and Manage Train Schedules across Indian Railways Routes
          </Text>
        </div>

        <Button 
          type="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsAddModalOpen(true)}
          style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#7c3aed', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)' }}
        >
          Add New Train
        </Button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }}
        bodyStyle={{ padding: '16px 20px' }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Input 
            prefix={<Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />}
            placeholder="Search by Train Name, Number, Departure or Destination..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', height: '42px' }}
          />
          <Text style={{ color: '#94a3b8', fontWeight: '700', whiteSpace: 'nowrap' }}>
            {filteredTrains.length} Trains Found
          </Text>
        </div>
      </Card>

      {/* TRAINS TABLE */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155' }}
        bodyStyle={{ padding: '0' }}
      >
        <Table 
          columns={columns}
          dataSource={filteredTrains}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          style={{ backgroundColor: 'transparent' }}
        />
      </Card>

      {/* ADD TRAIN MODAL */}
      <Modal
        title={<span style={{ color: '#7c3aed', fontWeight: '800', fontSize: '1.2rem' }}>Add New Train Schedule</span>}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        centered
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTrain} style={{ marginTop: '16px' }}>
          <Form.Item name="trainName" label="Train Name" rules={[{ required: true, message: 'Please enter train name' }]}>
            <Input placeholder="e.g. Vande Bharat Express" style={{ borderRadius: '8px' }} />
          </Form.Item>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="trainNumber" label="Train Number" rules={[{ required: true, message: 'Required' }]} style={{ flex: 1 }}>
              <Input placeholder="e.g. 22345" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="duration" label="Duration" style={{ flex: 1 }}>
              <Input placeholder="e.g. 8h 30m" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="departureStation" label="Departure Code" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="PNBE" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="arrivalStation" label="Arrival Code" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="NDLS" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="fareSL" label="Sleeper Fare (₹)" style={{ flex: 1 }}>
              <Input type="number" placeholder="385" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="fare3A" label="3AC Fare (₹)" style={{ flex: 1 }}>
              <Input type="number" placeholder="1360" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="fare2A" label="2AC Fare (₹)" style={{ flex: 1 }}>
              <Input type="number" placeholder="1950" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#7c3aed', fontWeight: '700' }}>
              Create Train Schedule
            </Button>
          </div>
        </Form>
      </Modal>

    </div>
  );
};

export default AdminTrains;

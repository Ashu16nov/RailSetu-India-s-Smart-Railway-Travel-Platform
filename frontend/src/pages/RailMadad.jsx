import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Typography, message } from 'antd';
import { AlertTriangle } from 'lucide-react';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const RailMadad = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/services/complaint', values);
      message.success(`Grievance registered successfully! Ref ID: ${data.referenceId}`);
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit grievance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <Card style={{ borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <AlertTriangle size={48} color="#f04134" />
          <Title level={2} style={{ margin: '10px 0 0 0', color: '#1e293b' }}>Rail Madad</Title>
          <Text type="secondary">Inquiry, Assistance & Grievance Redressal</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="pnr" label="PNR / UTS Number" rules={[{ required: true, message: 'Please enter PNR' }]}>
            <Input size="large" placeholder="10-digit PNR" maxLength={10} />
          </Form.Item>
          
          <Form.Item name="category" label="Grievance Type" rules={[{ required: true, message: 'Select a category' }]}>
            <Select size="large" placeholder="Select Type">
              <Option value="Medical">Medical Emergency</Option>
              <Option value="Security">Security / Theft</Option>
              <Option value="Cleanliness">Coach Cleanliness</Option>
              <Option value="Catering">Food & Catering</Option>
              <Option value="Staff Behavior">Staff Behavior</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Incident Description" rules={[{ required: true, message: 'Please describe the issue' }]}>
            <TextArea rows={4} placeholder="Provide details about your complaint..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ background: '#f04134', borderColor: '#f04134' }}>
              Submit Grievance
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RailMadad;

import React, { useState } from 'react';
import { Card, Input, Button, Typography, Row, Col, message, List, Tag } from 'antd';
import { Utensils, Search, CheckCircle } from 'lucide-react';
import axios from 'axios';

const { Title, Text } = Typography;

const RESTAURANTS = [
  { id: 1, name: "Haldiram's", rating: 4.5, type: "North Indian, Sweets", deliveryStation: "New Delhi (NDLS)", items: ["Deluxe Thali", "Chole Bhature", "Raj Kachori"] },
  { id: 2, name: "Domino's Pizza", rating: 4.2, type: "Fast Food, Italian", deliveryStation: "Bhopal Jn (BPL)", items: ["Margherita", "Peppy Paneer", "Garlic Bread"] },
  { id: 3, name: "Comesum", rating: 3.9, type: "Multi-Cuisine", deliveryStation: "Itarsi Jn (ET)", items: ["Veg Biryani", "Paneer Butter Masala", "Dal Makhani"] },
  { id: 4, name: "Saravana Bhavan", rating: 4.8, type: "South Indian", deliveryStation: "Vijayawada Jn (BZA)", items: ["Masala Dosa", "Idli Vada", "Filter Coffee"] }
];

const FoodBooking = () => {
  const [pnr, setPnr] = useState('');
  const [searched, setSearched] = useState(false);
  const [booking, setBooking] = useState(null);

  const searchFood = async () => {
    if (!pnr) return message.error("Enter PNR to see available restaurants");
    
    // Simulate finding the journey and matching with upcoming stations
    setTimeout(() => {
      setSearched(true);
      setBooking({ pnr, trainName: "Superfast Express", date: "15 Oct 2026" });
    }, 500);
  };

  const bookMeal = async (item) => {
    try {
      await axios.post('http://localhost:5000/api/services/food', { pnr, item });
      message.success(`Successfully ordered ${item}! It will be delivered at the station.`);
    } catch(err) {
      message.error("Failed to place order.");
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
      <Card style={{ borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Utensils size={48} color="#00a854" />
          <Title level={2} style={{ margin: '10px 0 0 0', color: '#1e293b' }}>E-Catering</Title>
          <Text type="secondary">Order hot, hygienic food delivered straight to your seat</Text>
        </div>

        <div style={{ display: 'flex', gap: '10px', maxWidth: 600, margin: '0 auto' }}>
          <Input 
            size="large" 
            placeholder="Enter PNR to find food on your route" 
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            prefix={<Search size={18} color="#bfbfbf" />}
            onPressEnter={searchFood}
          />
          <Button type="primary" size="large" onClick={searchFood} style={{ background: '#00a854', borderColor: '#00a854' }}>
            Find Food
          </Button>
        </div>
      </Card>

      {searched && (
        <>
          <Title level={4} style={{ marginBottom: '16px' }}>Available Restaurants on your route</Title>
          <Row gutter={[24, 24]}>
            {RESTAURANTS.map(rest => (
              <Col xs={24} md={12} key={rest.id}>
                <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <Title level={5} style={{ margin: 0 }}>{rest.name}</Title>
                      <Text type="secondary" style={{ fontSize: '12px' }}>{rest.type}</Text>
                    </div>
                    <div>
                      <Tag color="green">★ {rest.rating}</Tag>
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong type="success"><CheckCircle size={14} style={{verticalAlign:'middle'}}/> Delivers at: {rest.deliveryStation}</Text>
                  </div>
                  <List
                    size="small"
                    dataSource={rest.items}
                    renderItem={item => (
                      <List.Item
                        actions={[<Button type="link" onClick={() => bookMeal(item)}>Order</Button>]}
                      >
                        {item}
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default FoodBooking;

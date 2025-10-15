import React, { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';

// Dữ liệu accounts
const accounts = [
  { id: 1, username: 'alice', password: 'pass123', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, username: 'bob', password: 'pass456', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, username: 'charlie', password: 'pass789', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, username: 'diana', password: 'pass321', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, username: 'edward', password: 'pass654', avatar: 'https://i.pravatar.cc/150?img=5' },
];

function Accounts() {
  // State để lưu chuỗi tìm kiếm
  const [search, setSearch] = useState('');

  // Lọc accounts dựa trên username
  const filtered = accounts.filter(account =>
    account.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ 
      padding: 20, 
      background: 'white', 
      borderRadius: 8, 
      border: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h4 className="mb-3">Danh Sách Accounts</h4>
      
      {/* Input tìm kiếm */}
      <Form.Control
        placeholder="Tìm kiếm theo username..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-3"
        style={{ maxWidth: 400 }}
      />
      
      {/* Hiển thị kết quả */}
      <Row>
        {filtered.length === 0 && (
          <Col xs={12}>
            <div style={{ 
              padding: 20, 
              textAlign: 'center', 
              color: '#888',
              background: '#f8f9fa',
              borderRadius: 8
            }}>
              Không tìm thấy kết quả
            </div>
          </Col>
        )}
        
        {filtered.map(account => (
          <Col key={account.id} md={4} sm={6} xs={12} className="mb-3">
            <Card style={{ 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Card.Body>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {/* Avatar */}
                  <div style={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: 28, 
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold',
                    fontSize: '24px'
                  }}>
                    {account.username.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* Thông tin */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '18px', color: '#333' }}>
                      {account.username}
                    </div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      ID: {account.id}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Accounts;

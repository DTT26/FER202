import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserShield, FaCreditCard, FaBook } from 'react-icons/fa';

const ReduxDashboard = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">
        🚀 Lab 6: Redux Toolkit Demo Dashboard
      </h1>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaUserShield className="me-2 text-primary" />
                User Management
              </Card.Title>
              <Card.Text>
                <strong>Bài tập 1:</strong> Quản Lý Người Dùng
                <ul className="mt-2">
                  <li>createAsyncThunk - fetchUsers</li>
                  <li>Synchronous Reducer - toggleAdminStatus</li>
                  <li>Selectors - selectAllUsers, selectUsersByRole</li>
                  <li>extraReducers - Xử lý 3 trạng thái async</li>
                </ul>
              </Card.Text>
              <Link to="/users/redux">
                <Button variant="primary">
                  Xem Demo Users
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaCreditCard className="me-2 text-success" />
                Payment Management
              </Card.Title>
              <Card.Text>
                <strong>Bài tập 2:</strong> Quản Lý Thanh Toán
                <ul className="mt-2">
                  <li>createPayment - POST operation</li>
                  <li>rejectWithValue - Xử lý lỗi 402</li>
                  <li>refundPayment - 3 trạng thái</li>
                  <li>Reselect - selectSuccessfulPayments</li>
                </ul>
              </Card.Text>
              <Link to="/payments/redux">
                <Button variant="success">
                  Xem Demo Payments
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Header className="bg-info text-white">
          <FaBook className="me-2" />
          Tài liệu tham khảo
        </Card.Header>
        <Card.Body>
          <h5>Câu hỏi lý thuyết (Câu 1-5):</h5>
          <ul>
            <li>Redux Thunk là gì? Tại sao cần?</li>
            <li>3 ưu điểm của Redux Toolkit</li>
            <li>createSlice vs createReducer</li>
            <li>Async Thunk cho Refund Payment</li>
            <li>User State Initialization</li>
          </ul>
          <p className="mb-0">
            📄 Xem file <code>LAB6_ANSWERS.md</code> để đọc đầy đủ câu trả lời
          </p>
        </Card.Body>
      </Card>

      <Alert className="mt-4" variant="warning">
        <h6>⚙️ Hướng dẫn chạy:</h6>
        <ol className="mb-0">
          <li>
            Terminal 1: <code>npm run serve:json</code> (Port 3001 - JSON Server)
          </li>
          <li>
            Terminal 2: <code>npm start</code> (Port 3000 - React App)
          </li>
          <li>Mở Redux DevTools để xem actions và state changes</li>
        </ol>
      </Alert>
    </Container>
  );
};

export default ReduxDashboard;

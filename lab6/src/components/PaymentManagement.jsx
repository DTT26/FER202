import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPayments,
  createPayment,
  refundPayment,
  selectAllPayments,
  selectPaymentsLoading,
  selectPaymentsError,
  selectSuccessfulPayments,
  selectTotalAmount,
  selectSuccessfulTotalAmount,
} from '../redux/slices/paymentsSlice';
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Badge,
  Form,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { FaCreditCard, FaPlus, FaUndo } from 'react-icons/fa';

const PaymentManagement = () => {
  const dispatch = useDispatch();

  // Selectors
  const payments = useSelector(selectAllPayments);
  const isLoading = useSelector(selectPaymentsLoading);
  const error = useSelector(selectPaymentsError);
  const successfulPayments = useSelector(selectSuccessfulPayments);
  const totalAmount = useSelector(selectTotalAmount);
  const successfulTotal = useSelector(selectSuccessfulTotalAmount);

  // Local state cho form
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    semester: '',
    courseName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'SUCCESS',
  });

  // Fetch payments khi component mount
  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle create payment
  const handleCreatePayment = async (e) => {
    e.preventDefault();

    const newPayment = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now().toString(), // Mock ID
    };

    try {
      await dispatch(createPayment(newPayment)).unwrap();
      // Reset form
      setFormData({
        userId: '',
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        status: 'SUCCESS',
      });
      setShowForm(false);
    } catch (err) {
      // Error đã được handle trong slice
      console.error('Failed to create payment:', err);
    }
  };

  // Handle refund payment
  const handleRefund = (paymentId) => {
    if (window.confirm('Bạn có chắc chắn muốn hoàn tiền giao dịch này?')) {
      dispatch(refundPayment(paymentId));
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (isLoading && payments.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Đang tải danh sách thanh toán...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaCreditCard className="me-2" />
          Quản Lý Thanh Toán - Redux Toolkit Demo
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus className="me-2" />
          {showForm ? 'Đóng Form' : 'Tạo Thanh Toán'}
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Tổng Thanh Toán</Card.Title>
              <h3>{payments.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <Card.Title>Thành Công</Card.Title>
              <h3>{successfulPayments.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <Card.Title>Tổng Tiền</Card.Title>
              <h5>{formatCurrency(totalAmount)}</h5>
              <small>
                Success: {formatCurrency(successfulTotal)}
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Create Payment Form */}
      {showForm && (
        <Card className="mb-4">
          <Card.Header className="bg-primary text-white">
            Tạo Thanh Toán Mới
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleCreatePayment}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control
                      type="text"
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      placeholder="Fall 2025"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên Khóa Học</Form.Label>
                    <Form.Control
                      type="text"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số Tiền</Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ngày</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="SUCCESS">SUCCESS</option>
                      <option value="PENDING">PENDING</option>
                      <option value="FAILED">FAILED</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? 'Đang xử lý...' : 'Tạo Thanh Toán'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Payments Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Semester</th>
            <th>Khóa Học</th>
            <th>Số Tiền</th>
            <th>Ngày</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                Không có thanh toán nào
              </td>
            </tr>
          ) : (
            payments.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>{payment.userId}</td>
                <td>{payment.semester}</td>
                <td>{payment.courseName}</td>
                <td>{formatCurrency(payment.amount)}</td>
                <td>{payment.date}</td>
                <td>
                  <Badge
                    bg={
                      payment.status === 'SUCCESS'
                        ? 'success'
                        : payment.status === 'PENDING'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {payment.status || 'SUCCESS'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleRefund(payment.id)}
                    disabled={isLoading}
                  >
                    <FaUndo /> Refund
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Demo Note */}
      <Alert variant="info" className="mt-4">
        <h6>📝 Demo Features:</h6>
        <ul className="mb-0">
          <li>
            <strong>createPayment:</strong> Tạo thanh toán mới với xử lý lỗi 402
            (Tài khoản không đủ tiền)
          </li>
          <li>
            <strong>refundPayment:</strong> Hoàn tiền với 3 trạng thái (pending,
            fulfilled, rejected)
          </li>
          <li>
            <strong>Reselect Selectors:</strong> selectSuccessfulPayments,
            selectTotalAmount
          </li>
          <li>
            <strong>extraReducers:</strong> Xử lý async actions
          </li>
        </ul>
      </Alert>
    </Container>
  );
};

export default PaymentManagement;

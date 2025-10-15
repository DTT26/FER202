import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

function LoginForm2() {
  // State là một object gồm username và password
  // Quản lý nhiều trường input bằng 1 state duy nhất
  const [user, setUser] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Xử lý thay đổi input - dùng chung cho cả username và password
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Áp dụng immutability với spread operator ...
    setUser((prev) => ({ ...prev, [name]: value }));

    // Kiểm tra lỗi cho từng trường
    if (value.trim() === '') {
      const fieldName = name === 'username' ? 'Username' : 'Password';
      setErrors((prev) => ({ ...prev, [name]: `${fieldName} không được để trống` }));
    } else {
      // Xóa lỗi nếu đã nhập đúng
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (user.username.trim() === '') {
      newErrors.username = 'Username không được để trống';
    }
    if (user.password.trim() === '') {
      newErrors.password = 'Password không được để trống';
    }

    setErrors(newErrors);

    // Nếu không có lỗi, hiển thị modal
    if (Object.keys(newErrors).length === 0) {
      setShowModal(true);
    }
  };

  // Đóng modal và reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setUser({ username: '', password: '' });
    setErrors({});
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="text-center mb-0">Form Đăng Nhập 2 (Object State)</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username2" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password2" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Đăng Nhập
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thông báo đăng nhập thành công */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Nhập Thành Công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success text-center">
            Chào mừng, <strong>{user.username}</strong>!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm2;

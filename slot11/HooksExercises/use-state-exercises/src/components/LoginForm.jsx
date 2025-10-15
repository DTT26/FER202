import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

function LoginForm() {
  // useState cho các input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // useState hiển thị modal
  const [showModal, setShowModal] = useState(false);

  // Xử lý thay đổi input username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Validate khi người dùng nhập
    if (e.target.value.trim() === '') {
      setErrors((prev) => ({ ...prev, username: 'Username không được để trống' }));
    } else {
      // Xóa lỗi nếu đã nhập đúng
      setErrors((prev) => {
        const { username, ...rest } = prev;
        return rest;
      });
    }
  };

  // Xử lý thay đổi password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Validate khi người dùng nhập
    if (e.target.value.trim() === '') {
      setErrors((prev) => ({ ...prev, password: 'Password không được để trống' }));
    } else {
      // Xóa lỗi nếu đã nhập đúng
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    
    const newErrors = {};
    if (username.trim() === '') {
      newErrors.username = 'Username không được để trống';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password không được để trống';
    }

    setErrors(newErrors);

    // Nếu không có lỗi, hiển thị modal thành công
    if (Object.keys(newErrors).length === 0) {
      setShowModal(true);
    }
  };

  // Đóng modal và reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setUsername('');
    setPassword('');
    setErrors({});
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="text-center mb-0">Form Đăng Nhập</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
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

      {/* Modal hiển thị khi đăng nhập thành công */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Nhập Thành Công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success">Chào mừng, <strong>{username}</strong>!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm;

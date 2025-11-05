import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuthDispatch();
  const { error: authError, loading } = useAuthState();
  const hasError = Boolean(authError);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      navigate('/movies');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 480 }}>
      <h2 className="mb-3">Đăng nhập</h2>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            value={username}
            onChange={e => setUsername(e.target.value)}
            isInvalid={hasError}
            placeholder="Nhập tên đăng nhập"
          />
          {/* show error under the input when login fails */}
          <Form.Control.Feedback type="invalid">
            {authError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            isInvalid={hasError}
            placeholder="Nhập mật khẩu"
          />
          <Form.Control.Feedback type="invalid">
            {authError}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex gap-2">
          <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Đang...' : 'Đăng nhập'}</Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;

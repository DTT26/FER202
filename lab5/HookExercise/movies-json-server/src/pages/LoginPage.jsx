import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuthDispatch();
  const { error: authError, loading } = useAuthState();
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
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Đang...' : 'Đăng nhập'}</Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;

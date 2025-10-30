import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/movies">🎬 Movies JSON Server</Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Navbar.Text className="me-3">
                Xin chào, <strong>{user.fullname || user.username}</strong>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={logout}>
                Đăng xuất
              </Button>
            </>
          ) : null}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

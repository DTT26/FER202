import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.fullName || user?.username || 'Student';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/home">TuitionTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/users')} className="text-white me-3" style={{ cursor: 'pointer' }}>
              User Management
            </Nav.Link>
            <Navbar.Text className="me-3">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt="avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/avt1.jpg';
                  }}
                  style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8, objectFit: 'cover' }}
                />
              )}
              Signed in as: <strong>{fullName}</strong>
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { logout } from '../redux/authSlice';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="light" className="shadow-sm border-bottom">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            width="30" 
            height="30" 
            className="me-2"
          />
          <strong>PersonalBudget</strong>
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">
            Signed in as <strong>{user?.fullName}</strong>
          </span>
          <Button variant="danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
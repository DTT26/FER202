import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Toast, Modal } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // when user logs in, show welcome toast and modal
  useEffect(() => {
    if (user) {
      setShowToast(true);
      // show modal slightly after toast for nicer UX
      const t = setTimeout(() => setShowModal(true), 500);
      return () => clearTimeout(t);
    }
    // if user logged out, hide both
    setShowToast(false);
    setShowModal(false);
  }, [user]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/movies">🎬 Movies JSON Server</Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Navbar.Text className="me-3">
                Xin chào, <strong>{user.fullname || user.username}</strong>
                <small className="ms-2 text-info">({user.role || 'student'})</small>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={logout}>
                Đăng xuất
              </Button>
            </>
          ) : null}
        </Nav>

        {/* Toast (top-right) */}
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1060 }}>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Chào mừng</strong>
            </Toast.Header>
            <Toast.Body>Xin chào, {user?.fullname || user?.username} — bạn đã đăng nhập thành công.</Toast.Body>
          </Toast>
        </div>

        {/* Welcome modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Welcome</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Xin chào, <strong>{user?.fullname || user?.username}</strong>!</p>
            <p>Chúc bạn một ngày làm việc hiệu quả 🎉</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default Header;

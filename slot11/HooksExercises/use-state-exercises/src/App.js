import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import Accounts from './components/Accounts';
import RegisterForm from './components/RegisterForm';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div>
      {/* Header Navigation */}
      <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
        <Container>
          <Navbar.Brand href="#" style={{ fontWeight: 'bold', fontSize: '24px' }}>
            useState Hook Exercises
          </Navbar.Brand>
          <Nav>
            <Nav.Item className="text-light ms-3">
              By tungdtde180564@fpt.edu.vn
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="pb-5">
        <h2 className="text-center mb-4">7 Bài Tập useState Hook</h2>
        
        <Row className="g-4">
          {/* Exercise 1 & 2 */}
          <Col md={6}>
            <CounterComponent />
          </Col>
          <Col md={6}>
            <LightSwitch />
          </Col>

          {/* Exercise 3 & 4 */}
          <Col md={6}>
            <LoginForm />
          </Col>
          <Col md={6}>
            <LoginForm2 />
          </Col>

          {/* Exercise 5 */}
          <Col md={6}>
            <SearchItem />
          </Col>

          {/* Exercise 6 */}
          <Col md={12}>
            <Accounts />
          </Col>

          {/* Exercise 7 */}
          <Col md={12}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

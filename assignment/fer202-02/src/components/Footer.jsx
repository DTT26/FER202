import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-5 border-top">
      <Container>
        <Row>
          <Col className="text-start">
            <p className="text-muted mb-0">
              © 2025 PersonalBudget Demo
            </p>
          </Col>
          <Col className="text-end">
            <p className="text-muted mb-0">
              Built with React, Redux Toolkit & JSON Server
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
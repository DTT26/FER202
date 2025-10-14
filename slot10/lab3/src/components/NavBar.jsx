import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Dropdown, InputGroup } from 'react-bootstrap';

export default function NavBar({ onNavigate }) {
  const [quickSearch, setQuickSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Quick search:', quickSearch);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <div className="container">
        <Navbar.Brand href="#home">
          <i className="bi bi-film me-2"></i>
          MovieLab
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => onNavigate && onNavigate('home')}>
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => onNavigate && onNavigate('about')}>
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
            <Nav.Link onClick={() => onNavigate && onNavigate('contact')}>
              <i className="bi bi-envelope me-1"></i>
              Contact
            </Nav.Link>
          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Quick search..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                style={{ width: '200px' }}
              />
              <Button variant="outline-light" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          <Nav className="d-flex flex-row">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="outline-light" size="sm">
                <i className="bi bi-person-circle me-1"></i>
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onNavigate && onNavigate('profiles')}>
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Manage Your Profiles
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onNavigate && onNavigate('account')}>
                  <i className="bi bi-person-plus me-2"></i>
                  Build your Account
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onNavigate && onNavigate('password')}>
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="outline-light" size="sm" className="me-2">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </Button>

            <Button variant="outline-light" size="sm">
              <i className="bi bi-heart me-1"></i>
              Favourites
            </Button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
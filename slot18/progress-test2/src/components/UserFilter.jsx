import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const UserFilter = ({ onChange, initial = { search: '', role: 'all', status: 'all', sort: 'username' } }) => {
  const [filter, setFilter] = useState(initial);

  useEffect(() => {
    setFilter(initial);
  }, [initial]);

  useEffect(() => {
    onChange && onChange(filter);
  }, [filter, onChange]);

  return (
    <Form className="mb-3">
      <Row className="align-items-end">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              placeholder="username or full name"
              value={filter.search}
              onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select value={filter.role} onChange={(e) => setFilter((f) => ({ ...f, role: e.target.value }))}>
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select value={filter.status} onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
              <option value="blocked">Blocked</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Sort</Form.Label>
            <Form.Select value={filter.sort} onChange={(e) => setFilter((f) => ({ ...f, sort: e.target.value }))}>
              <option value="username">Username</option>
              <option value="fullName">Full name</option>
              <option value="role">Role</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button variant="secondary" onClick={() => setFilter({ search: '', role: 'all', status: 'all', sort: 'username' })}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserFilter;

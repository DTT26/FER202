import React, { useState } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

export default function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: '',
    yearRange: 'all',
    sortBy: 'title-asc'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="filter-section bg-light p-4 rounded mb-4">
      <Row className="g-3">
        <Col md={4}>
          <Form.Label className="fw-bold">
            <i className="bi bi-search me-2"></i>
            Search
          </Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search movie title..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <Button variant="outline-secondary">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Col>

        <Col md={4}>
          <Form.Label className="fw-bold">
            <i className="bi bi-calendar me-2"></i>
            Release Year
          </Form.Label>
          <Form.Select
            value={filters.yearRange}
            onChange={(e) => handleFilterChange('yearRange', e.target.value)}
          >
            <option value="all">All</option>
            <option value="<=2000">Before 2000</option>
            <option value="2001-2015">2001 - 2015</option>
            <option value=">2015">After 2015</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Label className="fw-bold">
            <i className="bi bi-sort-down me-2"></i>
            Sort By
          </Form.Label>
          <Form.Select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="year-desc">Year ↓ (Newest)</option>
            <option value="year-asc">Year ↑ (Oldest)</option>
            <option value="duration-desc">Duration ↓ (Longest)</option>
            <option value="duration-asc">Duration ↑ (Shortest)</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
}
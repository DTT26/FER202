import React from 'react';
import { Card, Form } from 'react-bootstrap';

const FilterCard = ({ filterCategory, onFilterChange }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Form.Group>
          <Form.Label>Filter</Form.Label>
          <Form.Label className="d-block text-muted small">Category</Form.Label>
          <Form.Select
            value={filterCategory}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="">All categories</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Mua sắm">Mua sắm</option>
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;
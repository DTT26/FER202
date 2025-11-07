import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const PaymentForm = ({ initial = {}, onSubmit, submitting }) => {
  const [form, setForm] = useState({
    // use courseName to match db.json
    courseName: initial.courseName ?? initial.course ?? '',
    semester: initial.semester || '',
    date: initial.date || '',
    amount: initial.amount || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      courseName: initial.courseName ?? initial.course ?? '',
      semester: initial.semester || '',
      date: initial.date || '',
      amount: initial.amount || '',
    });
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // clear error for this field as user types
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Inline validation
    const newErrors = {};
    if (!form.courseName || String(form.courseName).trim() === '') newErrors.courseName = 'Course is required';
    if (!form.semester || String(form.semester).trim() === '') newErrors.semester = 'Semester is required';
    if (form.amount === '' || form.amount === null) newErrors.amount = 'Amount is required';
    const amountNum = Number(form.amount);
    if (!newErrors.amount && (isNaN(amountNum) || amountNum < 0)) newErrors.amount = 'Amount must be a non-negative number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ ...form, amount: amountNum, courseName: form.courseName });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Student ID removed: payments are tied to the logged-in user automatically */}
      <Form.Group className="mb-3">
        <Form.Label>Course</Form.Label>
        <Form.Control
          name="courseName"
          value={form.courseName}
          onChange={handleChange}
          isInvalid={!!errors.courseName}
        />
        <Form.Control.Feedback type="invalid">{errors.courseName}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Semester</Form.Label>
        <Form.Control
          name="semester"
          value={form.semester}
          onChange={handleChange}
          isInvalid={!!errors.semester}
        />
        <Form.Control.Feedback type="invalid">{errors.semester}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" value={form.date} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          min="0"
          step="1"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          isInvalid={!!errors.amount}
        />
        <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
      </Form.Group>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Form>
  );
};

export default PaymentForm;

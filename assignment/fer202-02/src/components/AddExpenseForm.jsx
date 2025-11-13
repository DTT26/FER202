import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { addExpense, updateExpense } from '../redux/expenseSlice';
import { expenseService } from '../services/apiService';

const AddExpenseForm = ({ onExpenseAdded, editingExpense, setEditingExpense }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: ''
  });
  
  const [error, setError] = useState('');

  // Load editing expense data
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        name: editingExpense.name,
        amount: editingExpense.amount,
        category: editingExpense.category,
        // keep date in YYYY-MM-DD so it works with <input type="date" />
        date: editingExpense.date || ''
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Common categories for select
  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Mua sắm'];

  const handleReset = () => {
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: ''
    });
    setError('');
    if (setEditingExpense) {
      setEditingExpense(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!formData.category.trim()) {
      setError('Category is required');
      return;
    }
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    // date is provided by native date input in YYYY-MM-DD format
    if (!formData.date) {
      setError('Date is required');
      return;
    }

    try {
      const expenseData = {
        userId: user.id,
        name: formData.name.trim(),
        amount: amount,
        category: formData.category.trim(),
        // store date as YYYY-MM-DD
        date: formData.date
      };

      if (editingExpense) {
        // Update existing expense
        const updatedExpense = { ...editingExpense, ...expenseData };
        await expenseService.updateExpense(editingExpense.id, updatedExpense);
        dispatch(updateExpense(updatedExpense));
        setEditingExpense(null);
      } else {
        // Add new expense
        const addedExpense = await expenseService.addExpense(expenseData);
        dispatch(addExpense(addedExpense));
      }
      
      // Clear form
      handleReset();
      
      // Notify parent to refresh if needed
      if (onExpenseAdded) {
        onExpenseAdded();
      }
      
    } catch (err) {
      setError('Failed to save expense. Please try again.');
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </Card.Title>
        
        {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Expense name"
            />
          </Form.Group>
          
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0"
                  step="1000"
                  min="0"
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>
          
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" type="submit">
              {editingExpense ? 'Save' : 'Add'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddExpenseForm;
                  
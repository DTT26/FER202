import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Table, Button } from 'react-bootstrap';
import { deleteExpense } from '../redux/expenseSlice';
import { expenseService } from '../services/apiService';

const ExpenseTable = ({ expenses, onEdit, onUpdate }) => {
  const dispatch = useDispatch();

  // Format date from YYYY-MM-DD to DD-MM-YYYY for display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Format amount to VND
  const formatVND = (amount) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const handleEditClick = (expense) => {
    if (onEdit) {
      onEdit(expense);
    }
  };

  const handleDeleteClick = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        // Delete from backend
        await expenseService.deleteExpense(expenseId);
        
        // Update Redux state
        dispatch(deleteExpense(expenseId));
        
        // Notify parent to refresh
        if (onUpdate) {
          onUpdate();
        }
      } catch (err) {
        alert('Failed to delete expense. Please try again.');
      }
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">Expense Management</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No expenses found
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{formatVND(expense.amount)}</td>
                  <td>{expense.category}</td>
                  <td>{formatDateDisplay(expense.date)}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditClick(expense)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpenseTable;


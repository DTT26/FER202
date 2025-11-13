import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

const TotalCard = () => {
  const { expenses } = useSelector(state => state.expenses);

  // Calculate total amount
  const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  // Format to VND currency
  const formatVND = (amount) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="text-muted mb-3">Total Expenses</Card.Title>
        <p>{formatVND(totalAmount)}</p>
      </Card.Body>
    </Card>
  );
};

export default TotalCard;
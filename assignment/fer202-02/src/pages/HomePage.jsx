import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TotalCard from '../components/TotalCard.jsx';
import FilterCard from '../components/FilterCard.jsx';
import AddExpenseForm from '../components/AddExpenseForm.jsx';
import ExpenseTable from '../components/ExpenseTable.jsx';
import { setExpenses } from '../redux/expenseSlice';
import { expenseService } from '../services/apiService';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { expenses } = useSelector(state => state.expenses);
  const [filterCategory, setFilterCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadExpenses = async () => {
    try {
      const data = await expenseService.getExpensesByUserId(user.id);
      dispatch(setExpenses(data));
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  // Filter expenses by category
  const filteredExpenses = filterCategory.trim() === ''
    ? expenses
    : expenses.filter(expense => 
        expense.category.toLowerCase().includes(filterCategory.toLowerCase())
      );

  return (
    <div className="home-page">
      <Header />
      <Container className="py-4">
        <Row>
          <Col md={4}>
            <TotalCard />
            <div className="mt-4">
              <AddExpenseForm 
                onExpenseAdded={loadExpenses}
                editingExpense={editingExpense}
                setEditingExpense={setEditingExpense}
              />
            </div>
          </Col>
          
          <Col md={8}>
            <FilterCard 
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
            />
            <div className="mt-4">
              <ExpenseTable 
                expenses={filteredExpenses}
                onEdit={setEditingExpense}
                onUpdate={loadExpenses}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState({});

  const handleFilter = (f) => setFilter(f || {});

  return (
    <>
      <NavigationHeader />
      <Container>
  <FilterBar onFilter={handleFilter} />
        <div className="d-flex justify-content-end mb-3">
          <Button onClick={() => navigate('/payments/add')}>Add Payment</Button>
        </div>
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Dashboard Overview</Card.Header>
          <Card.Body>
            <PaymentTable filter={filter} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DashboardPage;

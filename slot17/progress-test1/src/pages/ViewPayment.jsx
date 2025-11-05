import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';

const ViewPayment = () => {
  const { id } = useParams();
  const { getPaymentById } = usePayment();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const p = await getPaymentById(id);
        setPayment(p);
      } catch (err) {
        console.error(err);
        alert('Failed to load payment');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Payment Details</Card.Header>
        <Card.Body>
          {payment ? (
            <ListGroup variant="flush">
              <ListGroup.Item><strong>ID:</strong> {payment.id}</ListGroup.Item>
              <ListGroup.Item><strong>Student ID:</strong> {payment.userId ?? payment.studentId}</ListGroup.Item>
              <ListGroup.Item><strong>Course:</strong> {payment.courseName ?? payment.course}</ListGroup.Item>
              <ListGroup.Item><strong>Semester:</strong> {payment.semester}</ListGroup.Item>
              <ListGroup.Item><strong>Date:</strong> {payment.date}</ListGroup.Item>
              <ListGroup.Item><strong>Amount:</strong> {payment.amount}</ListGroup.Item>
            </ListGroup>
          ) : (
            <div>No payment found.</div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewPayment;

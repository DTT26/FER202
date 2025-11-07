import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import { usePayment } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';

const AddPayment = () => {
  const { addPayment, getPaymentById, updatePayment } = usePayment();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const isEdit = !!id;
  const [initial, setInitial] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data = await getPaymentById(id);
          setInitial(data);
        } catch (err) {
          console.error(err);
          alert('Failed to load payment');
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      // Attach userId from logged-in user when creating (or preserve for edit)
      const payload = { ...formData };
      if (isEdit) {
        // prefer existing owner if present, otherwise set to current user
        payload.userId = initial?.userId ?? initial?.studentId ?? user?.id;
        await updatePayment(id, payload);
      } else {
        payload.userId = user?.id;
        const created = await addPayment(payload);
        // optionally navigate to detail page of created payment
        // navigate(`/payments/${created.id}`);
      }
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)} className="me-2">
              Back
            </Button>
            <span className="h5 mb-0">{isEdit ? 'Edit Payment' : 'Add Payment'}</span>
          </div>
        </Card.Header>
        <Card.Body>
          <PaymentForm initial={initial || {}} onSubmit={handleSubmit} submitting={saving} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPayment;

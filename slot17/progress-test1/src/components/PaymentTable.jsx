import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Modal, ListGroup } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PaymentTable = ({ filter = {} }) => {
  const { payments, loading, error, fetchPayments, deletePayment, getPaymentById } = usePayment();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalPayment, setModalPayment] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = async (id) => {
    setModalLoading(true);
    setShowModal(true);
    try {
      const p = await getPaymentById(id);
      setModalPayment(p);
    } catch (err) {
      console.error(err);
      setModalPayment(null);
      alert('Failed to load payment');
      setShowModal(false);
    } finally {
      setModalLoading(false);
    }
  };
  const handleEdit = (id) => navigate(`/payments/${id}/edit`);

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this payment?');
    if (!ok) return;
    try {
      await deletePayment(id);
    } catch (err) {
      console.error(err);
      alert('Delete failed: ' + err.message);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <div className="text-danger">{error}</div>;

  // Apply owner filtering first (only show payments for logged-in user)
  const allList = (payments || []).slice();
  const list = user
    ? allList.filter((p) => String(p.userId ?? p.studentId ?? '') === String(user.id))
    : allList;
  const search = (filter.search || '').toLowerCase();
  let filtered = list.filter((p) => {
    if (filter.semester && p.semester !== filter.semester) return false;
    if (filter.course && (p.courseName ?? p.course) !== filter.course) return false;
    if (search) {
      const sem = (p.semester || '').toLowerCase();
      const course = ((p.courseName ?? p.course) || '').toLowerCase();
      return sem.includes(search) || course.includes(search);
    }
    return true;
  });

  // sorting
  if (filter.sort) {
    switch (filter.sort) {
      case 'course_asc':
        filtered.sort((a, b) => ((a.courseName ?? a.course) || '').localeCompare((b.courseName ?? b.course) || ''));
        break;
      case 'course_desc':
        filtered.sort((a, b) => ((b.courseName ?? b.course) || '').localeCompare((a.courseName ?? a.course) || ''));
        break;
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date_desc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amount_asc':
        filtered.sort((a, b) => (Number(a.amount) || 0) - (Number(b.amount) || 0));
        break;
      case 'amount_desc':
        filtered.sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
        break;
      default:
        break;
    }
  }

  const displayedTotal = filtered.reduce((s, p) => s + (Number(p.amount) || 0), 0);

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h5>Payments</h5>
        <div>Total amount: <strong>{displayedTotal}</strong></div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Semester</th>
            <th>Course</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered && filtered.length > 0 ? filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.semester}</td>
              {/* support both course and courseName fields */}
              <td>{p.courseName ?? p.course ?? ''}</td>
              <td>{p.amount}</td>
              <td style={{ display: 'flex', gap: 8 }}>
                <Button size="sm" variant="info" onClick={() => handleView(p.id)}>View</Button>
                <Button size="sm" variant="warning" onClick={() => handleEdit(p.id)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={4} className="text-center">No payments found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalLoading ? (
            <div className="d-flex justify-content-center"><Spinner animation="border" /></div>
          ) : modalPayment ? (
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Student ID:</strong> {modalPayment.userId ?? modalPayment.studentId}</ListGroup.Item>
              <ListGroup.Item><strong>Course:</strong> {modalPayment.courseName ?? modalPayment.course}</ListGroup.Item>
              <ListGroup.Item><strong>Semester:</strong> {modalPayment.semester}</ListGroup.Item>
              <ListGroup.Item><strong>Date:</strong> {modalPayment.date}</ListGroup.Item>
              <ListGroup.Item><strong>Amount:</strong> {modalPayment.amount}</ListGroup.Item>
            </ListGroup>
          ) : (
            <div>No payment found.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentTable;

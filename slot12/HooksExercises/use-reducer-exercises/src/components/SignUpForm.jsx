import React, { useReducer, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

// Regex helpers
const isEmail = (v) => /\S+@\S+\.[A-Za-z]{2,}/.test(v);
const isUsername = (v) => /^[A-Za-z0-9._]{3,}$/.test(v.trim());
const isStrongPassword = (v) =>
  /[A-Z]/.test(v) &&        // has upper
  /[a-z]/.test(v) &&        // has lower
  /\d/.test(v) &&           // has number
  /[^A-Za-z0-9]/.test(v) && // has special
  v.length >= 8;            // min length

const initialForm = {
  username: '',
  email: '',
  password: '',
  confirm: '',
};

const initialUi = {
  errors: {},
  showModal: false,
  showToast: false,
};

function validateField(field, value, form) {
  switch (field) {
    case 'username':
      if (!value.trim()) return 'Username is required';
      if (!isUsername(value)) return '≥ 3 chars, letters/numbers/._ only, no spaces';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!isEmail(value)) return 'Invalid email format';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (!isStrongPassword(value)) return '≥8 chars, upper, lower, number, special';
      return '';
    case 'confirm':
      if (!value) return 'Please confirm password';
      if (value !== form.password) return 'Passwords do not match';
      return '';
    default:
      return '';
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, form: { ...state.form, [action.field]: action.value } };
    case 'SET_ERRORS':
      return { ...state, ui: { ...state.ui, errors: action.errors } };
    case 'SHOW_TOAST':
      return { ...state, ui: { ...state.ui, showToast: action.value } };
    case 'SHOW_MODAL':
      return { ...state, ui: { ...state.ui, showModal: action.value } };
    case 'RESET':
      return { form: { ...initialForm }, ui: { ...initialUi } };
    default:
      return state;
  }
}

function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, { form: initialForm, ui: initialUi });
  const { form, ui } = state;

  // memoized validation errors for whole form
  const formErrors = useMemo(() => {
    const e = {};
    Object.keys(form).forEach((field) => {
      const err = validateField(field, form[field], form);
      if (err) e[field] = err;
    });
    return e;
  }, [form]);

  const isValid = Object.keys(formErrors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', field: name, value });
    // update single-field error immediately
    const singleError = validateField(name, value, { ...form, [name]: value });
    dispatch({ type: 'SET_ERRORS', errors: { ...ui.errors, [name]: singleError } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const err = validateField(field, form[field], form);
      if (err) newErrors[field] = err;
    });
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: 'SHOW_TOAST', value: true });
      dispatch({ type: 'SHOW_MODAL', value: true });
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    isInvalid={!!ui.errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {ui.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!ui.errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {ui.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!ui.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {ui.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    isInvalid={!!ui.errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {ui.errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={!isValid} className="w-100">
                    Submit
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleCancel} className="w-100">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast */}
      <Toast
        show={ui.showToast}
        onClose={() => dispatch({ type: 'SHOW_TOAST', value: false })}
        delay={2000}
        autohide
        style={{ position: 'fixed', top: 20, right: 20, minWidth: 220, zIndex: 9999 }}
      >
        <Toast.Header>
          <strong className="me-auto text-success">Success</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal */}
      <Modal show={ui.showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {form.username}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Password:</strong> {form.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SignUpForm;

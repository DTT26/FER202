import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useToast } from './ToastMessage';
import ConfirmModal from './ConfirmModal';

  const initialState = {
  user: { username: '', password: '' },
  errors: {},
  showModal: false, // controls confirm modal visibility
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return { ...state, user: { ...state.user, [action.field]: action.value } };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.value } };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...rest } = state.errors;
      return { ...state, errors: rest };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SHOW_MODAL':
      return { ...state, showModal: action.value };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

function LoginFormReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, errors, showModal } = state;
  const { showSuccess } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_FIELD', field: name, value });

    if (value.trim() === '') {
      const fieldName = name === 'username' ? 'Username' : 'Password';
      dispatch({ type: 'SET_ERROR', field: name, value: `${fieldName} không được để trống` });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (user.username.trim() === '') newErrors.username = 'Username không được để trống';
    if (user.password.trim() === '') newErrors.password = 'Password không được để trống';

    dispatch({ type: 'SET_ERRORS', errors: newErrors });

    if (Object.keys(newErrors).length === 0) {
      // open the confirm modal; toast shown when user confirms
      dispatch({ type: 'SHOW_MODAL', value: true });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: 'SHOW_MODAL', value: false });
  };

  const handleConfirm = () => {
    // user confirmed — show toast and reset form
    showSuccess(`Welcome ${user.username}`);
    dispatch({ type: 'SHOW_MODAL', value: false });
    dispatch({ type: 'RESET' });
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="text-center mb-0">Form Đăng Nhập (useReducer)</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username2" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password2" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Đăng Nhập
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
        title="Đăng Nhập Thành Công"
        message={`Chào mừng, ${user.username}!`}
        type="success"
        confirmText="OK"
        cancelText="Cancel"
        showCancel={false}
        confirmVariant="success"
      />
    </Container>
  );
}

export default LoginFormReducer;

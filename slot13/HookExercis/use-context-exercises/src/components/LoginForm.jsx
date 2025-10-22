import React, { useReducer, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Form, Button, Toast, Modal, Card } from 'react-bootstrap'

const initialState = { username: '', password: '', error: null }

function reducer(state, action) {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value }
    case 'error':
      return { ...state, error: action.error }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { username, password, error } = state
  const { login, user, logout } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      dispatch({ type: 'error', error: 'Both fields required' })
      setToastMsg('Both fields required')
      setShowToast(true)
      return
    }

    const res = await login({ username, password })
    if (!res.ok) {
      dispatch({ type: 'error', error: res.message })
      setToastMsg(res.message)
      setShowToast(true)
    } else {
      dispatch({ type: 'reset' })
      setToastMsg('Đăng nhập thành công!')
      setShowToast(true)
      setShowSuccessModal(true)
    }
  }

  const handleLogout = () => {
    logout()
    setToastMsg('Logged out')
    setShowToast(true)
    dispatch({ type: 'error', error: 'Logged out' })
  }

  return (
    <>
      {user ? (
        <div style={{ padding: 12, border: '1px solid #ccc', marginBottom: 12 }}>
          <p>
            Logged in as: {user.username} ({user.role})
          </p>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Card style={{ maxWidth: 500, margin: '0 auto 16px auto', boxShadow: '0 2px 8px #0001' }}>
          <Card.Body style={{ padding: 16 }}>
            <Card.Title as="h5" style={{ fontSize: 18, marginBottom: 8 }}>Đăng nhập (admin)</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  size="sm"
                  value={username}
                  onChange={(e) => dispatch({ type: 'field', field: 'username', value: e.target.value })}
                  placeholder="Tên đăng nhập"
                  autoComplete="username"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  size="sm"
                  type="password"
                  value={password}
                  onChange={(e) => dispatch({ type: 'field', field: 'password', value: e.target.value })}
                  placeholder="Mật khẩu"
                  autoComplete="current-password"
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button size="sm" type="submit" variant="primary">
                  Đăng nhập
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide style={{ position: 'fixed', top: 20, right: 20, minWidth: 220, zIndex: 9999 }}>
        <Toast.Header>
          <strong className="me-auto">Notice</strong>
        </Toast.Header>
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are logged in as admin.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

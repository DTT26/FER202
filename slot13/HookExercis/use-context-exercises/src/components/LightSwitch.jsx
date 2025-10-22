import React, { useReducer } from 'react'
import { Button } from 'react-bootstrap'
import { useTheme } from '../contexts/ThemeContext'

const initialState = { isOn: false }

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { isOn: !state.isOn }
    case 'turnOn':
      return { isOn: true }
    case 'turnOff':
      return { isOn: false }
    default:
      return state
  }
}

export default function LightSwitch() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const toggle = () => dispatch({ type: 'toggle' })
  const turnOn = () => dispatch({ type: 'turnOn' })
  const turnOff = () => dispatch({ type: 'turnOff' })

  const { theme, toggleTheme } = useTheme()

  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: 12 }}>
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Đèn hiện đang: {state.isOn ? 'Bật' : 'Tắt'}</p>

      <Button
        onClick={toggleTheme}
        style={{
          ...buttonStyle,
          background: theme === 'light' ? '#6c757d' : '#f8f9fa',
          color: theme === 'light' ? '#ffffff' : '#000000',
        }}
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </Button>

      <Button onClick={toggle} style={{ ...buttonStyle, background: '#007bff', color: 'white' }}>
        Chuyển Đổi
      </Button>
      <Button onClick={turnOn} style={{ ...buttonStyle, background: '#28a745', color: 'white' }}>
        Bật Đèn
      </Button>
      <Button onClick={turnOff} style={{ ...buttonStyle, background: '#dc3545', color: 'white' }}>
        Tắt Đèn
      </Button>
    </div>
  )
}

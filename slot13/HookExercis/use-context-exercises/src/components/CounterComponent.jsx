import React, { useReducer } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useTheme } from '../contexts/ThemeContext'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const increment = () => dispatch({ type: 'increment' })
  const decrement = () => dispatch({ type: 'decrement' })
  const reset = () => dispatch({ type: 'reset' })

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
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Giá trị hiện tại: {state.count}</p>

      <Button
        style={{
          ...buttonStyle,
          background: theme === 'light' ? '#6c757d' : '#f8f9fa',
          color: theme === 'light' ? '#ffffff' : '#000000',
        }}
        onClick={toggleTheme}
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </Button>

      <Button onClick={increment} style={{ ...buttonStyle, background: '#007bff', color: 'white' }}>
        Tăng (+1)
      </Button>
      <Button onClick={decrement} style={{ ...buttonStyle, background: '#ffc107', color: '#333' }}>
        Giảm (-1)
      </Button>
      <Button onClick={reset} style={{ ...buttonStyle, background: 'red', color: 'white' }}>
        Reset
      </Button>
    </div>
  )
}

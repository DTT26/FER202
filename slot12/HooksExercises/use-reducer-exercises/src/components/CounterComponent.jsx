import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });
  const reset = () => dispatch({ type: 'reset' });

  const buttonStyle = {
    margin: '5px',
  };

  return (
    <Card className="p-3 mb-3">
      <h3>Bộ Đếm Đa Năng (useReducer)</h3>
      <p style={{ fontSize: '20px', fontWeight: '600' }}>Giá trị hiện tại: {state.count}</p>
      <div>
        <Button style={buttonStyle} onClick={increment} variant="primary">Tăng (+1)</Button>
        <Button style={buttonStyle} onClick={decrement} variant="warning">Giảm (-1)</Button>
        <Button style={buttonStyle} onClick={reset} variant="danger">Reset</Button>
      </div>
    </Card>
  );
}

export default CounterComponent;

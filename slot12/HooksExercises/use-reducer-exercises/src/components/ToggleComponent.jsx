import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';

const initialState = { on: false };

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { on: !state.on };
    case 'on':
      return { on: true };
    case 'off':
      return { on: false };
    default:
      return state;
  }
}

function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="p-3 mb-3">
      <h3>Toggle (useReducer)</h3>
      <p>Status: <strong>{state.on ? 'ON' : 'OFF'}</strong></p>
      <div>
        <Button variant={state.on ? 'success' : 'outline-success'} onClick={() => dispatch({ type: 'on' })} className="me-2">On</Button>
        <Button variant={!state.on ? 'warning' : 'outline-warning'} onClick={() => dispatch({ type: 'off' })} className="me-2">Off</Button>
        <Button variant="secondary" onClick={() => dispatch({ type: 'toggle' })}>Toggle</Button>
      </div>
    </Card>
  );
}

export default ToggleComponent;

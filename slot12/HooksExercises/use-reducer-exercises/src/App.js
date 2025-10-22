import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import LoginFormReducer from './components/LoginFormReducer';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div className="App container mt-4">
      <h1 className="mb-4">useReducer Exercises</h1>
      <CounterComponent />
      <ToggleComponent />
      <LoginFormReducer />
      <SignUpForm />
      <QuestionBank />
    </div>
  );
}

export default App;

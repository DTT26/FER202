import logo from './logo.svg';
import './App.css';
import Exercise1 from './component/exercise1';
import Exercise2 from './component/exercise2';
import Exercise3 from './component/exercise3';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Exercise1 />
        <Exercise2 />
        <Exercise3 />
      </header>
    </div>
  );
}

export default App;

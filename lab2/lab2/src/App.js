import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Menu from './components/Menu';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#333', minHeight: '100vh' }}>
      <Header />
      <Banner />
      <Menu />
      <BookingForm />
    </div>
  );
}

export default App;

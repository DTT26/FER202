import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import FooterPage from './pages/FooterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [route, setRoute] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleNavigation = (newRoute) => {
    setRoute(newRoute);
  };

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="App">
      {route === 'home' && (
        <HomePage 
          onNavigate={handleNavigation}
        />
      )}
      
      {route === 'movie' && (
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={() => setRoute('home')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Home
              </button>
            </div>
          </nav>
          <MoviePage movie={selectedMovie} />
        </div>
      )}
      
      {/* 'account' route removed: Account wizard opens as modal on HomePage */}
      
      {route === 'about' && (
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={() => setRoute('home')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Home
              </button>
            </div>
          </nav>
          <div className="container py-5">
            <h2>About MovieLab</h2>
            <p>Welcome to MovieLab - your ultimate destination for movie discovery and entertainment!</p>
          </div>
        </div>
      )}
      
      {route === 'contact' && (
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={() => setRoute('home')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Home
              </button>
            </div>
          </nav>
          <div className="container py-5">
            <h2>Contact Us</h2>
            <p>Get in touch with the MovieLab team!</p>
          </div>
        </div>
      )}
      
      {route === 'footer' && <FooterPage />}
    </div>
  );
}

export default App;

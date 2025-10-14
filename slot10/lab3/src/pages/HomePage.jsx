import React, { useState, useMemo } from 'react';
import NavBar from '../components/NavBar';
import HomeCarousel from '../components/home/HomeCarousel';
import Filter from '../components/Filter';
import MovieCard from '../components/Movie/MovieCard';
import MovieModal from '../components/Movie/MovieModal';
import Wizard from '../components/Wizard';
import { movies } from '../data/movies';
import MyFooter from '../components/Footer/MyFooter';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage({ onNavigate }) {
  const [filters, setFilters] = useState({
    search: '',
    yearRange: 'all',
    sortBy: 'title-asc'
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Filter by search
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchLower) ||
        movie.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by year range
    if (filters.yearRange !== 'all') {
      if (filters.yearRange === '<=2000') {
        result = result.filter(movie => movie.year <= 2000);
      } else if (filters.yearRange === '2001-2015') {
        result = result.filter(movie => movie.year >= 2001 && movie.year <= 2015);
      } else if (filters.yearRange === '>2015') {
        result = result.filter(movie => movie.year > 2015);
      }
    }

    // Sort
    switch (filters.sortBy) {
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'year-asc':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'duration-asc':
        result.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration-desc':
        result.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  // Intercept navigation to 'account' to open the Wizard modal instead of changing route
  const handleNavigate = (route) => {
    if (route === 'account') {
      setShowWizard(true);
    } else {
      onNavigate && onNavigate(route);
    }
  };

  return (
    <div className="home-page">
      <NavBar onNavigate={handleNavigate} />
      <HomeCarousel />

      <div className="container">
        <Filter onFilterChange={setFilters} />
        
        <section className="movie-grid" style={{marginTop: 30, marginBottom: 40}}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0 fw-bold">
              Now Showing 
              <span className="text-muted ms-2">({filteredMovies.length} movies)</span>
            </h3>
          </div>
          
          <div className="row g-4">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="col-sm-6 col-md-6 col-lg-4">
                <MovieCard movie={movie} onClick={() => handleMovieClick(movie)} />
              </div>
            ))}
          </div>
          
          {filteredMovies.length === 0 && (
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="bi bi-film fs-1 d-block mb-3"></i>
                <h5>No movies found</h5>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <MyFooter />

      {/* Movie Detail Modal */}
      <MovieModal 
        show={showModal}
        onHide={handleCloseModal}
        movie={selectedMovie}
      />

      {/* Account Wizard Modal */}
      {showWizard && (
        <Wizard onClose={() => setShowWizard(false)} />)
      }
    </div>
  );
}

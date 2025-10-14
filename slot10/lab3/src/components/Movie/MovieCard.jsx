// Copy nội dung này vào file: src/components/Movie/MovieCard.jsx

import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import './MovieCard.css';

export default function MovieCard({ movie, onClick }) {
  return (
    <Card 
      className="movie-card h-100 shadow-sm" 
      onClick={() => onClick && onClick(movie)} 
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div className="poster-container" style={{ height: 300, overflow: 'hidden', position: 'relative' }}>
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          alt={movie.title}
          className="movie-poster"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {movie.rating && (
          <div className="rating-overlay position-absolute top-0 start-0 m-2">
            <Badge 
              bg="warning" 
              text="dark" 
              className="rating-badge"
              style={{ 
                fontSize: '0.95rem',
                padding: '0.5rem 0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              <i className="bi bi-star-fill me-1"></i>
              {movie.rating}
            </Badge>
          </div>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="movie-title mb-2">
          {movie.title} 
          <span className="text-muted ms-2" style={{ fontSize: '0.9rem' }}>({movie.year})</span>
        </Card.Title>
        
        <div className="mb-2">
          {Array.isArray(movie.genre) ? (
            movie.genre.map((g, idx) => (
              <Badge key={idx} bg="info" text="dark" className="me-1">{g}</Badge>
            ))
          ) : (
            <Badge bg="info" text="dark">{movie.genre}</Badge>
          )}
        </div>
        
        <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {movie.description.length > 100 ? movie.description.substring(0, 100) + '...' : movie.description}
        </Card.Text>
        
        <div className="movie-meta mt-auto border-top pt-2">
          <small className="text-muted d-block">
            <i className="bi bi-clock me-1"></i>
            {movie.duration} min
          </small>
          <small className="text-muted d-block">
            <i className="bi bi-flag me-1"></i>
            {movie.country}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
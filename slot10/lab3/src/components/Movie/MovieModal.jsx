import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';

export default function MovieModal({ show, onHide, movie }) {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="img-fluid rounded" 
              style={{ width: '100%' }}
            />
          </Col>
          <Col md={8}>
            <div className="mb-3">
              <div className="d-flex flex-wrap gap-2 mb-2">
                {movie.genres && movie.genres.map((genre, idx) => (
                  <Badge key={idx} bg="info" className="text-dark">{genre}</Badge>
                ))}
                <Badge bg="secondary">{movie.year}</Badge>
                {movie.rating && (
                  <Badge bg="warning" className="text-dark">
                    <i className="bi bi-star-fill me-1"></i>
                    {movie.rating}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mb-3">
              <h6 className="text-muted mb-2">Description</h6>
              <p>{movie.detailedDescription || movie.description}</p>
            </div>
            
            {movie.director && (
              <div className="mb-3">
                <h6 className="text-muted mb-2">Director</h6>
                <p>{movie.director}</p>
              </div>
            )}
            
            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-3">
                <h6 className="text-muted mb-2">Cast</h6>
                <p>{movie.cast.join(', ')}</p>
              </div>
            )}
            
            <Row className="mb-3">
              <Col sm={6}>
                <h6 className="text-muted mb-2">Country</h6>
                <p>{movie.country}</p>
              </Col>
              <Col sm={6}>
                <h6 className="text-muted mb-2">Duration</h6>
                <p>{movie.duration} min</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
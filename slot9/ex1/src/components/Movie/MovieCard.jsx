import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Toast, Modal } from "react-bootstrap";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 1800);
    return () => clearTimeout(t);
  }, [showToast]);

  const addToFavourites = (m) => {
    try {
      const raw = localStorage.getItem("favourites") || "[]";
      const fav = JSON.parse(raw);
      if (!fav.find((x) => x.id === m.id)) {
        fav.push(m);
        localStorage.setItem("favourites", JSON.stringify(fav));
      }
      setShowToast(true);
    } catch (e) {
      console.error(e);
    }
  };

  const desc = movie && movie.description ? String(movie.description) : "";
  const shortDesc = desc.length > 110 ? desc.slice(0, 107) + "..." : desc;

  return (
    <>
      <Card className="movie-card h-100 shadow-sm">
        <div style={{ height: 220, overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={movie.poster}
            alt={movie.title}
            style={{ width: "100%", objectFit: "cover", height: "100%" }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0">{movie.title}</Card.Title>
            <div>
              <Badge bg="info" className="text-dark me-1">{movie.genre}</Badge>
              <Badge bg="secondary">{movie.year}</Badge>
            </div>
          </div>
          <Card.Text className="text-muted" style={{ flex: 1 }}>
            {shortDesc}
          </Card.Text>
          <div className="d-flex gap-2 mt-3">
            <Button variant="outline-primary" onClick={() => addToFavourites(movie)}>
              Add to Favourites
            </Button>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{ position: "fixed", top: 16, right: 16, zIndex: 2000 }}
        bg="success"
        autohide
        delay={1500}
      >
        <Toast.Body>Added to favourites!</Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={movie.poster} alt={movie.title} className="img-fluid mb-3" />
          <p>{desc}</p>
          <p>
            <strong>Country:</strong> {movie.country} &nbsp;{" "}
            <strong>Duration:</strong> {movie.duration} min
          </p>
          {Array.isArray(movie.showtimes) && movie.showtimes.length > 0 && (
            <div className="mt-3">
              <strong>Showtimes:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {movie.showtimes.map((s, idx) => (
                  <Badge bg="light" text="dark" key={idx} className="border">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

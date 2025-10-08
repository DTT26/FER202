import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <Container className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.</p>

        <Row className="g-4 mt-2">
          {movies.slice(0, 3).map((m) => (
            <Col key={m.id} xs={12} sm={6} md={4}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

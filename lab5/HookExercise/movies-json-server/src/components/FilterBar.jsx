import React, { useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
  const { genres } = useMovieState();
  const { fetchMovies } = useMovieDispatch();
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [duration, setDuration] = useState('');
  const [sort, setSort] = useState('');

  const handleFilter = async (e) => {
    e.preventDefault();
    // Construct query string for json-server API
    let query = [];
    if (search) query.push(`title_like=${encodeURIComponent(search)}`);
    if (genreId) query.push(`genreId=${genreId}`);
    if (duration) query.push(`duration_gte=${duration}`);
    if (sort) query.push(`_sort=title&_order=${sort}`);
    const qs = query.length ? '?' + query.join('&') : '';
    await fetchMovies(qs); // Update MovieContext to accept query string param!
  };
  const clearFilter = () => {
    setSearch('');
    setGenreId('');
    setDuration('');
    setSort('');
    fetchMovies();
  };
  return (
    <Form onSubmit={handleFilter} className="mb-3 p-2 border rounded bg-light">
      <Row className="align-items-end g-2">
        <Col md={3}>
          <Form.Label>Lọc tên phim</Form.Label>
          <Form.Control value={search} placeholder="Nhập tên phim..." onChange={e => setSearch(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Label>Thể loại</Form.Label>
          <Form.Select value={genreId} onChange={e => setGenreId(e.target.value)}>
            <option value="">Tất cả</option>
            {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label>Thời lượng ≥</Form.Label>
          <InputGroup>
            <Form.Control type="number" value={duration} min={0} placeholder="phút" onChange={e => setDuration(e.target.value)} />
            <InputGroup.Text>phút</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Label>Sắp xếp tên</Form.Label>
          <Form.Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">---</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button type="submit" variant="primary" className="me-2">Lọc</Button>
          <Button type="button" variant="secondary" onClick={clearFilter}>Xóa</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;

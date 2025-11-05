import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, genres, loading, movieToDelete, showDeleteModal, showViewDetail, currentMovie } = state;
  const { user } = useAuthState();

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const handleViewClick = (movie) => {
    dispatch({ type: 'OPEN_VIEW_DETAIL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng (phút)</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td><Image src={movie.avatar} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>{genreName}</td>
                  <td>{movie.duration} phút</td>
                  <td>
                    {user?.role === 'admin' ? (
                      <>
                        <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)} className="me-2">Xóa</Button>
                      </>
                    ) : null}
                    <Button variant="info" size="sm" onClick={() => handleViewClick(movie)} className="me-2">Xem</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim <strong>"{movieToDelete?.title}"</strong> (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewDetail} onHide={() => dispatch({ type: 'CLOSE_VIEW_DETAIL' })} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMovie ? (
            <div className="d-flex gap-3">
              <Image src={currentMovie.avatar} alt={currentMovie.title} rounded style={{ width: 160, height: 220, objectFit: 'cover' }} />
              <div>
                <h4>{currentMovie.title} <small className="text-muted">({currentMovie.year})</small></h4>
                <p><strong>Danh mục:</strong> {genres.find(g => g.id === currentMovie.genreId)?.name || 'Unknown'}</p>
                <p><strong>Thời lượng:</strong> {currentMovie.duration} phút</p>
                {currentMovie.description && <p><strong>Mô tả:</strong> {currentMovie.description}</p>}
                {currentMovie.director && <p><strong>Đạo diễn:</strong> {currentMovie.director}</p>}
                {currentMovie.cast && <p><strong>Diễn viên:</strong> {currentMovie.cast}</p>}
              </div>
            </div>
          ) : (
            <p>Không có dữ liệu phim.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_VIEW_DETAIL' })}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;

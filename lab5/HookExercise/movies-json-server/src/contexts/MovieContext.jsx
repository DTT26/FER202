import React, { createContext, useReducer, useContext, useEffect, useCallback, useState } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  const showToast = (message, variant = 'success', ms = 3000) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: '', variant }), ms);
  };

  const fetchMovies = useCallback(async (query = '') => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get(`/movies${query}`);
      dispatch({ type: 'SET_MOVIES', payload: response.data });
      // show informational toast when a filter/query is applied
      if (query && query !== '') {
        try {
          const count = Array.isArray(response.data) ? response.data.length : 0;
          showToast(`Hiển thị ${count} phim`, 'info');
        } catch {}
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error.message || error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
      console.error('Lỗi khi tải danh sách thể loại:', error.message || error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });
      try {
        await movieApi.delete(`/movies/${id}`);
        fetchMovies();
        showToast('Xóa phim thành công', 'success');
      } catch (error) {
        console.error('Lỗi khi xóa phim:', error.message || error);
        fetchMovies();
        showToast('Xóa phim thất bại', 'danger');
      }
    },
    [fetchMovies]
  );

  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditing) {
          await movieApi.put(`/movies/${isEditingId}`, dataToSend);
          showToast('Cập nhật phim thành công', 'success');
        } else {
          await movieApi.post('/movies', dataToSend);
          showToast('Thêm phim thành công', 'success');
        }
        dispatch({ type: 'RESET_FORM' });
        fetchMovies();
        return true;
      } catch (error) {
        console.error('Lỗi thao tác CREATE/UPDATE:', error.message || error);
        fetchMovies();
        showToast('Thao tác thất bại', 'danger');
        return false;
      }
    },
    [fetchMovies]
  );

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {/* Toast container */}
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1060 }}>
          {toast.show && (
            <div className={`alert alert-${toast.variant}`} role="alert" style={{ minWidth: 240 }}>
              {toast.message}
            </div>
          )}
        </div>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};

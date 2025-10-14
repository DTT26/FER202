import React from 'react';

export default function MoviePage({ movie }) {
  if (!movie) return <div className="container"><p>Select a movie to view details.</p></div>;
  return (
    <div className="container movie-page" style={{marginTop:20}}>
      <div className="row">
        <div className="col-md-4">
          <img src={movie.poster} alt={movie.title} style={{width:'100%',borderRadius:8}} />
        </div>
        <div className="col-md-8">
          <h2>{movie.title} <small>({movie.year})</small></h2>
          <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

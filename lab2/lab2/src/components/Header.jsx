import React from 'react';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2c2c2c', padding: '15px 0' }}>
      <div className="container">
        <a className="navbar-brand text-white fw-bold" href="#" style={{ fontSize: '1.8rem', marginRight: '3rem' }}>
          Pizza House
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto" style={{ gap: '2rem' }}>
            <li className="nav-item">
              <a className="nav-link text-white" href="#" style={{ fontSize: '1.1rem' }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#" style={{ fontSize: '1.1rem' }}>About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#" style={{ fontSize: '1.1rem' }}>Contact</a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              style={{ 
                width: '250px',
                backgroundColor: 'white',
                border: '1px solid #555',
                color: 'black'
              }}
            />
            <button 
              className="btn" 
              type="submit"
              style={{
                backgroundColor: '#dc3545',
                border: 'none',
                color: 'white',
                padding: '8px 12px'
              }}
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
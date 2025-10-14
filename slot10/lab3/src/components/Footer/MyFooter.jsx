import React from 'react';
import './Footer.css';

const MyFooter = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">
          © 2024 Movie Database | Created by{' '}
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-warning text-decoration-none"
          >
            ĐITITI
          </a>
        </p>
      </div>
    </footer>
  );
};

export default MyFooter;

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// pages (Exercise 1 only)
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';

// components/layout
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

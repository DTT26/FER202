import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="nav">
    <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
      Trang Chủ
    </NavLink>
    <NavLink to="/san-pham" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
      Sản Phẩm
    </NavLink>
    <NavLink to="/lien-he" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
      Liên Hệ
    </NavLink>
  </nav>
);

export default Navigation;

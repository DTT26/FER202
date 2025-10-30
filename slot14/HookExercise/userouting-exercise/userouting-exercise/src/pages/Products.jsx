import React from 'react';
import { Link } from 'react-router-dom';

export default function Products() {
  const products = [
    { id: 101, name: 'Sản phẩm 101' },
    { id: 102, name: 'Sản phẩm 102' },
    { id: 103, name: 'Sản phẩm 103' },
  ];

  return (
    <div>
      <h1>Sản Phẩm</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link to={`/san-pham/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Chi tiết sản phẩm</h1>
      <p>
        Chi tiết sản phẩm: <strong>{productId}</strong>
      </p>

      <button onClick={() => navigate('/san-pham')}>Quay lại trang sản phẩm</button>
    </div>
  );
}

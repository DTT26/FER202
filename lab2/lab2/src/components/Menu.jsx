import React from 'react';
import option1 from '../images/option1.png';
import option2 from '../images/option2.png';
import option3 from '../images/option3.png';
import option4 from '../images/option4.png';

export default function Menu() {
  const pizzas = [
    {
      id: 1,
      name: "Margherita Pizza",
      originalPrice: "$40.00",
      salePrice: "$34.00",
      image: option1,
      badge: "SALE"
    },
    {
      id: 2,
      name: "Mushroom Pizza", 
      price: "$25.00",
      image: option2,
      badge: ""
    },
    {
      id: 3,
      name: "Hawaiian Pizza",
      price: "$30.00", 
      image: option3,
      badge: "NEW"
    },
    {
      id: 4,
      name: "Pesto Pizza",
      originalPrice: "$50.00",
      salePrice: "$39.00",
      image: option4,
      badge: "SALE"
    }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-white mb-3">Our Menu</h2>
      </div>
      
      <div className="row g-4">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="col-md-6 col-lg-3">
            <div className="card h-100 shadow">
              <div className="position-relative">
                <img src={pizza.image} className="card-img-top" alt={pizza.name} style={{height: '200px', objectFit: 'cover'}} />
                {pizza.badge && (
                  <span className={`position-absolute top-0 start-0 badge text-dark fw-bold m-2`}
                        style={{ backgroundColor: '#f7f309ff' }}>
                    {pizza.badge}
                  </span>
                )}
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{pizza.name}</h5>
                <div className="card-text">
                  {pizza.badge === 'SALE' ? (
                    <div>
                      <span className="text-muted text-decoration-line-through me-2 fs-5">{pizza.originalPrice}</span>
                      <span className="fw-bold fs-4" style={{ color: '#f1ed08ff' }}>{pizza.salePrice}</span>
                    </div>
                  ) : (
                    <span className="text-dark fw-bold fs-4">{pizza.price}</span>
                  )}
                </div>
                <button className="btn btn-dark w-100">Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
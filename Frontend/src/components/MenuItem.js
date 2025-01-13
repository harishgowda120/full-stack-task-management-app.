import React from 'react';
import img from './image.png'

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{
          width: '18rem',
          transition: 'transform 0.3s ease-in-out', // Smooth hover effect
        }}
      >
        <img
          src={img}
          alt={item.name}
          className="card-img-top"
          style={{
            height: '250px',
            objectFit: 'cover',
            borderTopLeftRadius: 'calc(0.25rem - 1px)',
            borderTopRightRadius: 'calc(0.25rem - 1px)',
          }}
        />
        <div className="card-body">
          <h5 className="card-title text-center" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
            {item.name}
          </h5>
          <p
            className="card-text text-center text-success fs-5"
            style={{ fontSize: '1.1rem', fontWeight: '500' }}
          >
            ${item.price.toFixed(2)}
          </p>
          <button
            className="btn btn-warning w-100 py-2 fs-6 fw-bold"
            style={{
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease-in-out',
            }}
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

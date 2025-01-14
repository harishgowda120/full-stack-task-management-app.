import React from 'react';
import img from './image.png'

const MenuItem = ({ item, addToCart }) => {
  return (

    <div>
        <div className="card my-3 shadow-sm hover-effect">
          <img src={img} alt="..." height={200}/>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.price.toFixed(2)}</p>
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

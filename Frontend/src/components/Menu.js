import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import MenuItem from './MenuItem';

const Menu = () => {
  const { user } = useAppContext(); // Access user data from context
  const { menuItems, updateMenuItems } = useAppContext();
  const [cart, setCart] = useState([]); // State to store the cart items

  useEffect(() => {
    // Fetch menu items from the backend API
    const fetchMenuItems = async () => {
      try {
        
        const response = await axios.get('https://full-stack-task-management-app-2-bw9j.onrender.com/api/menu/');
        updateMenuItems(response.data); // Update the menu items in global state
      } catch (error) {
        console.error('Error fetching menu items', error);
      }
    };

    fetchMenuItems();
  }, [updateMenuItems]);

  const addToCart = (item) => {
    // Add item to cart
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItem = updatedCart.find((cartItem) => cartItem.menuItem._id === item._id);

      if (existingItem) {
        // If item already in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item is new, add to the cart
        updatedCart.push({ menuItem: item, quantity: 1 });
      }

      return updatedCart;
    });
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/order/placeorder',
        {
          userId:user.userId, // Use the userId for the order
          items: cart.map((cartItem) => ({
            menuItem: cartItem.menuItem._id,
            quantity: cartItem.quantity,
          })),
          totalAmount: cart.reduce((total, cartItem) => total + cartItem.menuItem.price * cartItem.quantity, 0),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token in the headers
          },
        }
      );
      console.log('Order placed successfully:', response.data);
      // Reset the cart after placing the order
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Our Menu</h2>
      <div className="row g-4">
        {menuItems.length === 0 ? (
          <div className="col-12 text-center">
            <p className="alert alert-warning">No menu items available. Please try again later.</p>
          </div>
        ) : (
          menuItems.map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item._id}>
              <MenuItem item={item} addToCart={addToCart} />
            </div>
          ))
        )}
      </div>

     {/* Display cart items */}
{cart.length > 0 && (
  <div className="m-4 p-4 border shadow-lg rounded-3 bg-light">
    <h3 className="text-center text-primary mb-4">Your Cart</h3>
    <ul className="list-unstyled">
      {cart.map((cartItem) => (
        <li key={cartItem.menuItem._id} className="d-flex justify-content-between align-items-center mb-3 p-3 border-bottom rounded-3 bg-white shadow-sm">
          <div className="item-details d-flex flex-column">
            <span className="fs-5 fw-bold">{cartItem.menuItem.name}</span>
            <span className="text-muted">x{cartItem.quantity}</span>
          </div>
          <div className="text-success fs-5 fw-bold">
            ${(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
          </div>
        </li>
      ))}
    </ul>
    <div className="d-flex justify-content-between align-items-center mt-4">
      <h5 className="text-danger fs-4">Total: ${(cart.reduce((total, cartItem) => total + cartItem.menuItem.price * cartItem.quantity, 0)).toFixed(2)}</h5>
      <button className="btn btn-success w-100 py-2 fs-6 fw-bold" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Menu;

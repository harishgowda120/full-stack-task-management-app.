import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext'; // Import context to access user data
import axios from 'axios';

const Cart = () => {
  const { user } = useAppContext(); // Access user data from context
  const [orders, setOrders] = useState([]); // Orders state to hold the orders data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    if (user) {
      // Fetch orders when user data is available
      const fetchOrders = async () => {
        try {
          // Send the Authorization token in headers and userId in the URL
          const response = await axios.get(`http://localhost:5000/api/order/orders/${user.userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token in headers
            },
          });

          // Set the fetched orders
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          setError('Failed to load orders');
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [user]); // Run this effect when the user changes

  const calculateTotal = (items) => {
    // Calculate the total for a single order's items
    return items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Handle the checkout process, e.g., redirect to checkout page
    alert('Proceeding to Checkout');
    // Redirect to checkout page or perform other actions
  };

  if (loading) {
    // Show loading message while waiting for the response
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    // Show error message if any error occurred
    return <div className="text-center text-danger">{error}</div>;
  }

  // Calculate the total payable amount for all orders
  const totalPayable = orders.reduce((total, order) => total + parseFloat(calculateTotal(order.items)), 0).toFixed(2);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Orders</h2>

      {/* Empty orders message */}
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center shadow-sm">
          You have no orders. Start shopping to place your order!
        </div>
      ) : (
        <>
          {/* Card container for the orders table */}
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-4">
              {/* Orders Table */}
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Order Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Loop through orders */}
                    {orders.map((order) => (
                      <React.Fragment key={order._id}>
                        {/* Loop through items in each order */}
                        {order.items.map((item, index) => (
                          <tr key={item._id}>
                            {index === 0 && (
                              <td rowSpan={order.items.length}>{order.items[0].menuItem.name}</td>
                            )}
                            {index === 0 && (
                              <td rowSpan={order.items.length}>{order.status}</td>
                            )}
                            {index === 0 && (
                              <td rowSpan={order.items.length}>
                                ${calculateTotal(order.items)}
                              </td>
                            )}
                            <td>{item.quantity}</td>
                            <td>${item.menuItem.price.toFixed(2)}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Checkout Details Section */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3 className="text-primary">Total Payable: ${totalPayable}</h3>
            <button
              className="btn btn-success px-4 py-2 shadow-sm"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

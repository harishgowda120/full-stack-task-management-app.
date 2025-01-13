import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Check for token in localStorage and set the user on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    if (token && username && userId) {
      // If token and user information exists in localStorage, set the user state
      setUser({ username, userId });
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Store token in localStorage
    localStorage.setItem('username', userData.username); // Store username in localStorage
    localStorage.setItem('userId', userData.userId); // Store userId in localStorage
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage on logout
    localStorage.removeItem('username'); // Remove username from localStorage on logout
    localStorage.removeItem('userId'); // Remove userId from localStorage on logout
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateMenuItems = (items) => {
    setMenuItems(items);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        menuItems,
        cart,
        loginUser,
        logoutUser,
        addToCart,
        removeFromCart,
        updateMenuItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

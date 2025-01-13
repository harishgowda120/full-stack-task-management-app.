import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';  // Import the AppProvider
import Navbar from './components/NavBar';
import LoginPage from './components/Login';
import MenuPage from './components/Menu';
import AddMenu from './components/AddMenu';

import Cart from './components/Cart';
import Register from './components/Register';



const App = () => {
  return (
    <AppProvider> {/* Wrap your app in the AppProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/AddMenu" element={<AddMenu />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;

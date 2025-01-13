const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

// Place an order
router.post('/placeorder', auth, placeOrder);

// Fetch all orders of the logged-in user
router.get('/orders/:userId', auth, getUserOrders); // This will handle fetching the orders for the authenticated user

module.exports = router;

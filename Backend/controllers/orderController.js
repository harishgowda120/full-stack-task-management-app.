const Order = require('../models/Order');
const Menu = require('../models/Menu');

// Place Order API
exports.placeOrder = async (req, res) => {
    try {
      const {userId, items, totalAmount } = req.body;
  
      // Create the order object
      const newOrder = new Order({
        userId: userId,
        items: items, // Items added to the cart
        totalAmount: totalAmount,
      });
  
      // Save the order to the database
      const order = await newOrder.save();
  
      res.status(201).json({
        message: 'Order placed successfully',
        order,
      });
    } catch (error) {
      console.error('Error placing order: ', error);
      res.status(500).json({
        message: 'Error placing order',
        error: error.message,
      });
    }
  };

// Fetch all orders of the logged-in user
// orderController.js
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;  // Get userId from URL parameters
        // Fetch orders where the userId matches the parameter passed in the URL
        const orders = await Order.find({ userId })
            .populate('items.menuItem') // Populate the menu items in the order
            .exec();

        // Return the orders as a response
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};


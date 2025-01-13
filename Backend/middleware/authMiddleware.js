// middleware/authMiddleware.js
const auth = (req, res, next) => {
    // Your authentication logic
    next();
};

module.exports = auth; // Export as function

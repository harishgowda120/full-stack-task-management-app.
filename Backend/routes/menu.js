const express = require('express');
const router = express.Router();
const { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const auth = require('../middleware/authMiddleware');



router.get('/', getMenu);
router.post('/', auth, addMenuItem);
router.put('/:id', auth, updateMenuItem);
router.delete('/:id', auth, deleteMenuItem);

module.exports = router;


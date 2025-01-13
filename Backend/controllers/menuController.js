const Menu = require('../models/Menu');

// Get all menu items
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error: error.message });
    }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    try {
        const { name, category, price, availability } = req.body;

        if (!name || !category || price == null || availability == null) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newItem = new Menu({ name, category, price, availability });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding menu item', error: error.message });
    }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu item', error: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await Menu.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item', error: error.message });
    }
};

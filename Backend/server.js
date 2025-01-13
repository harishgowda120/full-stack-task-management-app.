const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

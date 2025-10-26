require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rideRoutes = require('./routes/rideRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Ride-Service connected to MongoDB'))
  .catch(err => console.error('DB Connection Error:', err));

// Routes
app.use('/', rideRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Ride service is running' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`🚀 Ride Service listening on port ${PORT}`);
});
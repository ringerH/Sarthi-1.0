require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Auth-Service connected to MongoDB'))
  .catch(err => console.error('DB Connection Error:', err));

app.use('/', authRoutes); // Use your new routes

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Auth Service listening on port ${PORT}`);
});
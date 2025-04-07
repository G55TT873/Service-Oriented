const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const requestRoutes = require('./routes/router');

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/requests', requestRoutes);

// Connect to MongoDB using URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('MongoDB connection error: ', err));

// Default port to 5001
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const requestRoutes = require('./routes/requestRoutes');
require('dns').setDefaultResultOrder('ipv4first');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/requests', requestRoutes);

mongoose.connect(process.env.MONGO_URI, {
  tls: true,
  tlsAllowInvalidCertificates: false,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

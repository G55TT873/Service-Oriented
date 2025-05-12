// index.js
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const assignmentRoutes = require('./routes/assignmentRoutes');

// Load environment variables
dotenv.config();

// Register CORS plugin
fastify.register(require('@fastify/cors'), { origin: '*' });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/assignment-service', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => fastify.log.info('MongoDB connected'))
  .catch((err) => fastify.log.error('Mongo error:', err));

// Register routes
fastify.register(assignmentRoutes);

// Start server
const start = async () => {
  try {
    const PORT = process.env.PORT || 4000;
    await fastify.listen(PORT);
    console.log(`Assignment Service running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

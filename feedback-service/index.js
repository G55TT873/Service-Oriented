const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => fastify.log.info('Connected to MongoDB'))
  .catch(err => fastify.log.error(err));

// Middleware
fastify.register(require('@fastify/cors'), { origin: '*' });
fastify.register(require('@fastify/formbody'));

// Feedback Routes
fastify.register(require('./routes/feedback.routes'), { prefix: '/feedback' });

// Server Start
const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

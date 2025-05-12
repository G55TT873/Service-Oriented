require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

connectDB();

fastify.register(require('@fastify/cors')); // if needed for frontend
fastify.register(require('@fastify/formbody'));
fastify.register(userRoutes, { prefix: '/users' });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 8000 });
    console.log(`Server running on port ${process.env.PORT || 8000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

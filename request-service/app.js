'use strict';

const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Register CORS
fastify.register(require('@fastify/cors'), { origin: '*' });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => fastify.log.info('MongoDB connected'))
    .catch(err => fastify.log.error(err));

// Register routes
fastify.register(require('./routes/router'));

// Start Server
const PORT = process.env.PORT || 5001;

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

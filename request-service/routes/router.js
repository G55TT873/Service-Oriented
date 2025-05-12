const requestController = require('../controllers/Request');

async function requestRoutes(fastify, opts) {
    fastify.post('/api/requests', requestController.createRequest);
    fastify.get('/api/requests/user/:userId', requestController.getRequestsByUser);
    fastify.put('/api/requests/:id', requestController.updateRequest);
    fastify.delete('/api/requests/:id', requestController.deleteRequest);
}

module.exports = requestRoutes;

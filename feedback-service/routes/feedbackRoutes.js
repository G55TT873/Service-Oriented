const Feedback = require('../models/Feedback');

async function feedbackRoutes(fastify, options) {

  // POST /feedback - Add feedback
  fastify.post('/', async (request, reply) => {
    try {
      const feedback = await Feedback.create(request.body);
      reply.code(201).send(feedback);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  });

  // GET /feedback/request/:requestId - View feedback for a request
  fastify.get('/request/:requestId', async (request, reply) => {
    try {
      const feedbacks = await Feedback.find({ requestId: request.params.requestId });
      reply.send(feedbacks);
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  // GET /feedback/staff/:staffId - View feedback for a staff member
  fastify.get('/staff/:staffId', async (request, reply) => {
    try {
      const feedbacks = await Feedback.find({ staffId: request.params.staffId });
      reply.send(feedbacks);
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

}

module.exports = feedbackRoutes;

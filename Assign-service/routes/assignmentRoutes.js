// routes/assignmentRoutes.js
const Assignment = require('../models/assignmentModel');

async function assignmentRoutes(fastify, options) {
  fastify.post('/assignments', async (request, reply) => {
    try {
      const { requestId, staffId } = request.body;
      const assignment = new Assignment({ requestId, staffId });
      await assignment.save();
      reply.code(201).send(assignment);
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  fastify.get('/assignments/staff/:staffId', async (request, reply) => {
    try {
      const assignments = await Assignment.find({ staffId: request.params.staffId });
      reply.send(assignments);
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  fastify.put('/assignments/:id', async (request, reply) => {
    try {
      const assignment = await Assignment.findByIdAndUpdate(request.params.id, request.body, { new: true });
      if (!assignment) {
        return reply.code(404).send({ message: 'Assignment not found' });
      }
      reply.send(assignment);
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  fastify.delete('/assignments/:id', async (request, reply) => {
    try {
      const deletedAssignment = await Assignment.findByIdAndDelete(request.params.id);
      if (!deletedAssignment) {
        return reply.code(404).send({ message: 'Assignment not found' });
      }
      reply.send({ message: 'Assignment deleted successfully' });
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });
}

module.exports = assignmentRoutes;

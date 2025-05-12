const userController = require('../controllers/userController');

async function userRoutes(fastify, options) {
  fastify.post('/register', userController.register);
  fastify.post('/login', userController.login);
  fastify.get('/:id', userController.getUser);
  fastify.put('/role/:id', userController.updateRole);
}

module.exports = userRoutes;

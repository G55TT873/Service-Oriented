const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (request, reply) => {
  try {
    const { name, email, password } = request.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    reply.send(user);
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};

exports.login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    reply.send({ token });
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};

exports.getUser = async (request, reply) => {
  const user = await User.findById(request.params.id);
  if (!user) return reply.code(404).send({ error: 'User not found' });
  reply.send(user);
};

exports.updateRole = async (request, reply) => {
  const { role } = request.body;
  const user = await User.findByIdAndUpdate(request.params.id, { role }, { new: true });
  reply.send(user);
};

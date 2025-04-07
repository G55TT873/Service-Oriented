const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getUser,
  updateRole
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/:id', getUser);
router.put('/role/:id', updateRole);

module.exports = router;

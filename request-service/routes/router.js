const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequestsByUser,
  updateRequest,
  deleteRequest,
} = require('../controllers/Request.js');

// Create a new request
router.post('/', createRequest);

// Get all requests by user
router.get('/user/:userId', getRequestsByUser);

// Update a request
router.put('/:id', updateRequest);

// Delete a request
router.delete('/:id', deleteRequest);

module.exports = router;

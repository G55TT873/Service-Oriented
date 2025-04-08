const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequestsByUser,
  updateRequest,
  deleteRequest,
} = require('../controllers/Request.js');


router.post('/', createRequest);

router.get('/user/:userId', getRequestsByUser);


router.put('/:id', updateRequest);


router.delete('/:id', deleteRequest);

module.exports = router;

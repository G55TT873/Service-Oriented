const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /feedback - Add feedback
router.post('/', async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /feedback/request/:requestId - View feedback for a request
router.get('/request/:requestId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ requestId: req.params.requestId });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /feedback/staff/:staffId - View feedback for a staff member
router.get('/staff/:staffId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ staffId: req.params.staffId });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

router.post('/', async (req, res) => {
  try {
    const { requestId, staffId } = req.body;
    const assignment = new Assignment({ requestId, staffId });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/staff/:staffId', async (req, res) => {
  try {
    const assignments = await Assignment.find({ staffId: req.params.staffId });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

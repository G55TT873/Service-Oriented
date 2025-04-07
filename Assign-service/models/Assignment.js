const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Request',
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Assigned', 'In Progress', 'Completed'],
    default: 'Assigned',
  },
});

module.exports = mongoose.model('Assignment', assignmentSchema);

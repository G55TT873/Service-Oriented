const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  requestId: {
     type: String, 
     required: true 
    },
  userId: {
     type: String, 
     required: true 
    },
  staffId: {
     type: String, 
     required: true 
    },
  rating: { 
     type: Number, 
     required: true,
     min: 1, 
     max: 5 
    },
  comment: { 
     type: String, 
     required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
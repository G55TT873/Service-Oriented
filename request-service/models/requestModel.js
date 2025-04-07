const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['Pending','In Progress','Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request',requestSchema);
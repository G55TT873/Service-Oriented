const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
      },
    imageUrl: {
        type: String,
      },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

module.exports = mongoose.model("Request", RequestSchema);
const Request = require('../models/Request');

// Create a new request
const createRequest = async (req, res) => {
  const { userId, title, description, imageUrl, status } = req.body;

  try {
    const newRequest = new Request({
      userId,
      title,
      description,
      imageUrl,
      status,
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all requests by user
const getRequestsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await Request.find({ userId });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a request
const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, status } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(id, {
      title,
      description,
      imageUrl,
      status,
    }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a request
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRequest = await Request.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRequest,
  getRequestsByUser,
  updateRequest,
  deleteRequest,
};

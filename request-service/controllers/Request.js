const Request = require('../models/Request');

exports.createRequest = async (request, reply) => {
    try {
        const newRequest = new Request(request.body);
        const savedRequest = await newRequest.save();
        reply.code(201).send(savedRequest);
    } catch (err) {
        reply.code(500).send({ message: err.message });
    }
};

exports.getRequestsByUser = async (request, reply) => {
    const { userId } = request.params;
    try {
        const requests = await Request.find({ userId });
        reply.code(200).send(requests);
    } catch (err) {
        reply.code(500).send({ message: err.message });
    }
};

exports.updateRequest = async (request, reply) => {
    const { id } = request.params;
    try {
        const updatedRequest = await Request.findByIdAndUpdate(id, request.body, { new: true });
        if (!updatedRequest) {
            return reply.code(404).send({ message: 'Request not found' });
        }
        reply.code(200).send(updatedRequest);
    } catch (err) {
        reply.code(500).send({ message: err.message });
    }
};

exports.deleteRequest = async (request, reply) => {
    const { id } = request.params;
    try {
        const deletedRequest = await Request.findByIdAndDelete(id);
        if (!deletedRequest) {
            return reply.code(404).send({ message: 'Request not found' });
        }
        reply.code(200).send({ message: 'Request deleted successfully' });
    } catch (err) {
        reply.code(500).send({ message: err.message });
    }
};

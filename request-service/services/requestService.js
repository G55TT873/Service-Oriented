const Request = require("../models/requestModel");

const createRequest = async (data) => {
    return await Request.create(data);
};

const getAllRequests = async () => {
    return await Request.find();
};

const updateRequestStatus = async (id, status) => {
    return await Request.findByIdAndUpdate(id, {status},{new:true});
};

module.exports = {
    createRequest,
    getAllRequests,
    updateRequestStatus
};
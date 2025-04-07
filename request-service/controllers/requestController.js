const requestService = require('../services/requestService');

exports.create = async (requestService, res) => {
    try{
        const newRequest = await requestService.createRequest(req.body);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.getAll = async (req, res) => {
    try {
        const requests = await requestService.getAllRequests();
        res.json(requests);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.updateStatus = async (req , res) => {
    try{
        const updated = await requestService.updateRequestStatus(req.parms.id, req.body.status);
        res.json(updated);
    } catch (error){
        res.status(500).json({error:error.message});
    }
}
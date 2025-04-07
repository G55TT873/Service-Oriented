const Request = require("../models/requestModel");


const getRequest = async(req,res) => {
    Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.send(err));
};

const createRequest = async (req, res) => {
    const request = new Request({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        createdAt: req.body.createdAt,
    });

    try {
        const savedRequest = await request.save();
        res.json(savedRequest);
    } catch(err) {
        res.send(err);
    }
}

const updateUser = async (req, res) => {
    try {
      console.log(`Updating`);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userID },
        {
          $set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            createdAt: req.body.createdAt,
          },
        },
        { new: true }
      );
      console.log(`Updated`);
      res.json(updatedUser);
    } catch (err) {
      console.log(`Not Updated`);
      res.send(err);
    }
  };
// POST /requests done

// GET /requests/user/:userId

// PUT /requests/:id

// DELETE /requests/:id

// const requestService = require('../services/requestService');

// exports.create = async (requestService, res) => {
//     try{
//         const newRequest = await requestService.createRequest(req.body);
//         res.status(201).json(newRequest);
//     } catch (error) {
//         res.status(500).json({ error: error.message});
//     }
// };

// exports.getAll = async (req, res) => {
//     try {
//         const requests = await requestService.getAllRequests();
//         res.json(requests);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// };

// exports.updateStatus = async (req , res) => {
//     try{
//         const updated = await requestService.updateRequestStatus(req.parms.id, req.body.status);
//         res.json(updated);
//     } catch (error){
//         res.status(500).json({error:error.message});
//     }
// }
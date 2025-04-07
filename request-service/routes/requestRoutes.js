const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestController');

router.post('/',controller.create);
router.get('/',controller.getAll);
router.put('/:id/status', controller.updateStatus);

module.exports = router;
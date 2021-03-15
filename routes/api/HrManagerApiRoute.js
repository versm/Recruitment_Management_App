const express = require('express');
const router = express.Router();

const hrManagerApiController = require('../../api/HrManagerAPI');

router.get('/', hrManagerApiController.getHrManagers);
router.get('/:hrId', hrManagerApiController.getHrManagerById);
router.post('/', hrManagerApiController.createHrManager);
router.put('/:hrId', hrManagerApiController.updateHrManager);
router.delete('/:hrId', hrManagerApiController.deleteHrManager);

module.exports = router;


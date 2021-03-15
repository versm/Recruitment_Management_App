const express = require('express');
const router = express.Router();
const authUtils = require('../util/authUtils');

const hrmanagerController = require('../controllers/hrmanagerController');

router.get('/', hrmanagerController.showHrManagerList);
router.get('/add',authUtils.permitAuthenticatedHrManagerUser, hrmanagerController.showHrManagerAddForm);
router.get('/details/:hrmanagerId',authUtils.permitAuthenticatedHrManagerUser, hrmanagerController.showHrManagerDetails);
router.get('/edit/:hrmanagerId',authUtils.permitAuthenticatedHrManagerUser, hrmanagerController.showHrManagerEditForm);

router.post('/add', hrmanagerController.addHrManager);
router.post('/edit/', hrmanagerController.updateHrManager);
router.get('/delete/:hrmanagerId', hrmanagerController.deleteCandidate);

module.exports = router;
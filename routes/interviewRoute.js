const express = require('express');
const router = express.Router();
const authUtils = require('../util/authUtils');

const interviewController = require('../controllers/interviewController');

router.get('/', interviewController.showInterviewList);
router.get('/add',authUtils.permitAuthenticatedHrManagerUser, interviewController.showInterviewAddForm);
router.get('/edit/:interviewId',authUtils.permitAuthenticatedHrManagerUser,interviewController.showInterviewEditForm);

router.post('/add',authUtils.permitAuthenticatedHrManagerUser,interviewController.addInterview);
router.post('/edit/',authUtils.permitAuthenticatedHrManagerUser, interviewController.updateInterview);
router.get('/delete/:interviewId',authUtils.permitAuthenticatedHrManagerUser, interviewController.deleteInterview);

module.exports = router;
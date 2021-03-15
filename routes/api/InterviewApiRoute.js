const express = require('express');
const router = express.Router();

const interviewApiController = require('../../api/InterviewAPI');

router.get('/', interviewApiController.getInterviews);
router.get('/:interviewId', interviewApiController.getInterviewById);
router.post('/', interviewApiController.createInterview);
router.put('/:interviewId', interviewApiController.updateInterview);
router.delete('/:interviewId', interviewApiController.deleteInterview);

module.exports = router;


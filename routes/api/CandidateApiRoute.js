const express = require('express');
const router = express.Router();

const candApiController = require('../../api/CandidateAPI');

router.get('/', candApiController.getCandidates);
router.get('/:candId', candApiController.getCandidateById);
router.post('/', candApiController.createCandidate);
router.put('/:candId', candApiController.updateCandidate);
router.delete('/:candId', candApiController.deleteCandidate);

module.exports = router;


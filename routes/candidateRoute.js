const express = require('express');
const router = express.Router();
const authUtils = require('../util/authUtils');

const candidateController = require('../controllers/candidateController');

router.get('/', candidateController.showCandidatesList);
router.get('/add', candidateController.showAddCandidateForm);
router.get('/details/:candId', candidateController.showCandidateDetails);
router.get('/edit/:candId', candidateController.showCandidateEditForm);

router.post('/add', candidateController.addCandidate);
router.post('/edit/', candidateController.updateCandidate);
router.get('/delete/:candId', candidateController.deleteCandidate);

module.exports = router;


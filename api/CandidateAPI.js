const CandidateRepository = require('../repository/sequelize/CandidateRepository');

exports.getCandidates = (req, res, next) => {
    CandidateRepository.getCandidates()
        .then(cands => {
            res.status(200).json(cands);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCandidateById = (req, res, next) => {
    const candidateId = req.params.candId;
    CandidateRepository.getCandidateById(candidateId)
        .then(cnd => {
            if(!cnd) {
                res.status(404).json({
                    message: 'Candidate with id: '+candidateId+' not found'
                })
            } else {
                res.status(200).json(cnd);
            }
        });
};

exports.createCandidate = (req, res, next) => {
    CandidateRepository.createCandidate(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCandidate = (req, res, next) => {
    const candidateId = req.params.candId;
    CandidateRepository.updateCandidate(candidateId, req.body)
        .then(result => {
            res.status(200).json({message: 'Candidate updated!', candidate: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCandidate = (req, res, next) => {
    const candidateId = req.params.candId;
    CandidateRepository.deleteCandidate(candidateId)
        .then(result => {
            res.status(200).json({message: 'Removed candidate', candidate: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


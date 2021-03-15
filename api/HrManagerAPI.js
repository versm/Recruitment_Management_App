const HrManagerRepository = require('../repository/sequelize/HrManagerRepository');

exports.getHrManagers = (req, res, next) => {
    HrManagerRepository.getHrManagers()
        .then(hrs => {
            res.status(200).json(hrs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getHrManagerById = (req, res, next) => {
    const hrManagerId = req.params.hrId;
    HrManagerRepository.getHrManagerById(hrManagerId)
        .then(hr => {
            if(!hr) {
                res.status(404).json({
                    message: 'HrManager with id: '+hrManagerId+' not found'
                })
            } else {
                res.status(200).json(hr);
            }
        });
};

exports.createHrManager = (req, res, next) => {
    HrManagerRepository.createHrManager(req.body)
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

exports.updateHrManager = (req, res, next) => {
    const hrManagerId = req.params.hrId;
    HrManagerRepository.updateHrManager(hrManagerId, req.body)
        .then(result => {
            res.status(200).json({message: 'HrManager updated!', hrManager: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteHrManager = (req, res, next) => {
    const hrManagerId = req.params.hrId;
    HrManagerRepository.deleteHrManager(hrManagerId)
        .then(result => {
            res.status(200).json({message: 'Removed Hr Manager', hrManager: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


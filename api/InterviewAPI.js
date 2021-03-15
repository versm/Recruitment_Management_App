const InterviewRepository = require('../repository/sequelize/InterviewRepository');

exports.getInterviews = (req, res, next) => {
    InterviewRepository.getInterviews()
        .then(interviews => {
            res.status(200).json(interviews);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getInterviewById = (req, res, next) => {
    const interviewId = req.params.interviewId;
    InterviewRepository.getInterviewById(interviewId)
        .then(ivw => {
            if(!ivw) {
                res.status(404).json({
                    message: 'Interview with id: '+interviewId+' not found'
                })
            } else {
                res.status(200).json(ivw);
            }
        });
};

exports.createInterview = (req, res, next) => {
    InterviewRepository.createInterview(req.body)
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

exports.updateInterview = (req, res, next) => {
    const interviewId = req.params.interviewId;
    InterviewRepository.updateInterview(interviewId, req.body)
        .then(result => {
            res.status(200).json({message: 'Interview updated!', interview: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteInterview = (req, res, next) => {
    const interviewId = req.params.interviewId;
    InterviewRepository.deleteInterview(interviewId)
        .then(result => {
            res.status(200).json({message: 'Removed Interview', interview: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


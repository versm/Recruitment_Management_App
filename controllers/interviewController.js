const InterviewRepository = require('../repository/sequelize/InterviewRepository');
const CandidateRepository = require('../repository/sequelize/CandidateRepository');
const HrManagerRepository = require('../repository/sequelize/HrManagerRepository');


exports.showInterviewList = (req, res, next) => {
    if(req.session.loggedUser.hrManager_id != null) {
        InterviewRepository.getInterviews()
            .then(ivws => {
                res.render('pages/interview/list', {
                    ivws: ivws,
                    navLocation: 'ivw'
                });
            });
    }else{
        InterviewRepository.getCandidatesInterviews(req.session.loggedUser.candidate_id)
            .then(ivws => {
                res.render('pages/interview/list', {
                    ivws: ivws,
                    navLocation: 'ivw'
                });
            });
    }
}

exports.showInterviewAddForm = (req, res, next) => {
    let allCands,allHrMans;
    CandidateRepository.getCandidates()
        .then(cnds => {
            allCands = cnds;
            return HrManagerRepository.getHrManagers();
        })
        .then(hrs => {
            allHrMans=hrs;
            res.render('pages/interview/form', {
                interview: {},
                formMode: 'createNew',
                allCands: allCands,
                allHrMans: allHrMans,
                pageTitle: req.__('ivw.form.add.pageTitle'),
                formAction: '/interviews/add',
                navLocation: 'interview',
                btnLabel: req.__('ivw.form.add.btnLabel'),
            });
        });
}

exports.showInterviewEditForm = (req, res, next) => {
    const ivwId = req.params.interviewId;
    let allCands, allHrMans;

    CandidateRepository.getCandidates()
        .then(cnds => {
            allCands = cnds;
            return HrManagerRepository.getHrManagers();
        })
        .then(hrs => {
            allHrMans = hrs;
            return InterviewRepository.getInterviewById(ivwId);
        })
        .then(ivw => {
            res.render('pages/interview/edit', {
                interview: ivw,
                allCands: allCands,
                allHrMans: allHrMans,
                pageTitle: req.__('ivw.form.edit.pageTitle'),
                btnLabel: req.__('ivw.form.add.btnLabel'),
                formAction: '/interviews/edit',
                navLocation: 'interview'
            });
        });
}

exports.addInterview = (req, res, next) => {
    const ivwData = {...req.body};
    let allCands, allHrMans;

    InterviewRepository.createInterview(ivwData)
        .then(result => {
            res.redirect('/interviews');
        })
        .catch(err => {
            CandidateRepository.getCandidates()
                .then(cnds => {
                    allCands = cnds;
                    return HrManagerRepository.getHrManagers();
                })
                .then(hrs => {
                    console.log('data '+ivwData.date);
                    allHrMans = hrs;
                    res.render('pages/interview/form', {
                        interview: ivwData,
                        allCands: allCands,
                        allHrMans: allHrMans,
                        pageTitle: 'Nowa rozmowa rekrutacyjna',
                        btnLabel: 'Dodaj romowę rekrutacyjną',
                        formAction: '/interviews/add',
                        navLocation: 'interview',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.updateInterview = (req, res, next) => {
    const _id = req.body._id;
    const ivwData = {...req.body};
    let allCands, allHrMans;

    InterviewRepository.updateInterview(_id, ivwData)
        .then(result => {
            res.redirect('/interviews');
        })
        .catch(err => {
            CandidateRepository.getCandidates()
                .then(cnds => {
                    allCands = cnds;
                    return HrManagerRepository.getHrManagers();
                })
                .then(hrs => {
                    allHrMans = hrs;
                    return InterviewRepository.getInterviewById(_id)
                })
                .then(rental => {
                    console.log(new Date().toISOString().split('T')[0]);

                    res.render('pages/interview/edit', {
                        interview: ivwData,
                        allCands: allCands,
                        allHrMans: allHrMans,
                        pageTitle: 'Edycja rozmowy rekrutacyjnej',
                        btnLabel: 'Edytuj rozmowę rekrutacyjną',
                        formAction: '/interviews/edit',
                        navLocation: 'interview',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteInterview = (req, res, next) => {
    const ivwId = req.params.interviewId;
    InterviewRepository.deleteInterview(ivwId)
        .then(() => {
            res.redirect('/interviews');
        });
};
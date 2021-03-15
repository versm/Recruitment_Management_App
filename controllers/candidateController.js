const CandidateRepository = require('../repository/sequelize/CandidateRepository');
const UserRepository = require('../repository/sequelize/UserRepository');

exports.showCandidatesList = (req, res, next) => {
    CandidateRepository.getCandidates()
        .then(cnds => {
            res.render('pages/candidate/list', {
                cnds: cnds,
                navLocation: 'cnd'
            });
        });
}

exports.showAddCandidateForm = (req, res, next) => {
    res.render('pages/candidate/form', {
        cnd: {},
        pageTitle: req.__('cnd.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('cnd.form.add.btnLabel'),
        formAction: '/candidates/add',
        navLocation: 'cnd',
    });
}

exports.showCandidateDetails = (req, res, next) => {
    const cndId = req.params.candId;
    CandidateRepository.getCandidateById(cndId)
        .then(cnd => {
            res.render('pages/candidate/edit', {
                cnd: cnd,
                cndLogin:cnd,
                formMode: 'showDetails',
                pageTitle: req.__('cnd.form.details.pageTitle'),
                formAction: '',
                navLocation: 'cnd'
            });
        });
}
exports.showCandidateEditForm = (req, res, next) => {
    const cndId = req.params.candId;
    console.log(cndId);
        CandidateRepository.getCandidateById(cndId)
            .then(cnd => {
                res.render('pages/candidate/edit', {
                    cnd: cnd,
                    cndLogin: cnd,
                    formMode: 'edit',
                    pageTitle: req.__('cnd.form.edit.pageTitle'),
                    btnLabel: req.__('cnd.form.edit.btnLabel'),
                    formAction: '/candidates/edit',
                    navLocation: 'cnd'
                });
            });
}

exports.addCandidate = (req, res, next) => {
    const cndData = { ...req.body };

    CandidateRepository.createCandidate(cndData)
        .then( result => {
            res.redirect('/candidates');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if(e.path.includes('email') && e.type === 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
            });
            res.render('pages/candidate/form', {
                cnd: cndData,
                pageTitle: req.__('cnd.form.add.pageTitle'),
                btnLabel: req.__('cnd.form.add.btnLabel'),
                formAction: '/candidates/add',
                navLocation: 'cnd',
                validationErrors: err.errors
            });
        });
};

exports.updateCandidate = (req, res, next) => {
    const cndId = req.body._id;
    const cndData = { ...req.body};

    CandidateRepository.updateCandidate(cndId, cndData)
        .then( result => {
            return UserRepository.updateCandidateUser(cndId,cndData);
        })
        .then( result => {
            res.redirect('/candidates');
        })
        .catch(err => {
            CandidateRepository.getCandidateById(cndId)
                .then(loginInfo => {
                    err.errors.forEach(e => {
                        if(e.path.includes('email') && e.type === 'unique violation') {
                            e.message = "Podany adres email jest już używany";
                        }
                    });
                    res.render('pages/candidate/edit', {
                        cnd: cndData,
                        cndLogin: loginInfo,
                        formMode: 'edit',
                        pageTitle: req.__('cnd.form.edit.pageTitle'),
                        btnLabel: req.__('cnd.form.edit.btnLabel'),
                        formAction: '/candidates/edit',
                        navLocation: 'cnd',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteCandidate = (req, res, next) => {
    const cndId = req.params.candId;
    CandidateRepository.deleteCandidate(cndId)
        .then( () => {
            res.redirect('/candidates');
        });
};

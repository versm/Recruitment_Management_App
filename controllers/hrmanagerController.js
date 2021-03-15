const HrManagerRepository = require('../repository/sequelize/HrManagerRepository');
const UserRepository = require('../repository/sequelize/UserRepository');


exports.showHrManagerList = (req, res, next) => {
    HrManagerRepository.getHrManagers()
        .then(hrs => {
            res.render('pages/hrmanager/list', {
                hrs: hrs,
                navLocation: 'hr'
            });
        });
}

exports.showHrManagerAddForm = (req, res, next) => {
    res.render('pages/hrmanager/form', {
        hr: {},
        pageTitle: req.__('hr.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('hr.form.add.btnLabel'),
        formAction: '/hrmanagers/add',
        navLocation: 'hr'
    });
}

exports.showHrManagerDetails = (req, res, next) => {
    const hrId = req.params.hrmanagerId;
    HrManagerRepository.getHrManagerById(hrId)
        .then(hr => {
            res.render('pages/hrmanager/edit', {
                hr: hr,
                hrLogin:hr,
                formMode: 'showDetails',
                pageTitle: req.__('hr.form.details.pageTitle'),
                formAction: '',
                navLocation: 'hr'
            });
        });
}

exports.showHrManagerEditForm = (req, res, next) => {
    const hrId = req.params.hrmanagerId;
    HrManagerRepository.getHrManagerById(hrId)
        .then(hr => {
            res.render('pages/hrmanager/edit', {
                hr: hr,
                hrLogin: hr,
                formMode: 'edit',
                pageTitle: req.__('hr.form.edit.pageTitle'),
                btnLabel: req.__('hr.form.edit.btnLabel'),
                formAction: '/hrmanagers/edit',
                navLocation: 'hr'
            });
        });
}

exports.addHrManager = (req, res, next) => {
    const hrData = { ...req.body };
    HrManagerRepository.createHrManager(hrData)
        .then( result => {
            res.redirect('/hrmanagers');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if(e.path.includes('email') && e.type === 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
            });
            res.render('pages/hrmanager/form', {
                hr: hrData,
                pageTitle: req.__('hr.form.add.pageTitle'),
                btnLabel: req.__('hr.form.add.btnLabel'),
                formAction: '/hrmanagers/add',
                navLocation: 'hr',
                validationErrors: err.errors
            });
        });
};

exports.updateHrManager = (req, res, next) => {
    const hrId = req.body._id;
    const hrData = { ...req.body };
    HrManagerRepository.updateHrManager(hrId, hrData)
        .then( result => {
            return UserRepository.updateHrManagerUser(hrId,hrData);
        })
        .then( result => {
            res.redirect('/hrmanagers');
        })
        .catch(err => {
            HrManagerRepository.getHrManagerById(hrId)
                .then(loginInfo => {
                    err.errors.forEach(e => {
                        if(e.path.includes('email') && e.type === 'unique violation') {
                            e.message = "Podany adres email jest już używany";
                        }
                    });
                    res.render('pages/hrmanager/edit', {
                        hr: hrData,
                        hrLogin: loginInfo,
                        formMode: 'edit',
                        pageTitle: req.__('hr.form.edit.pageTitle'),
                        btnLabel: req.__('hr.form.edit.btnLabel'),
                        formAction: '/hrmanagers/edit',
                        navLocation: 'hr',
                        validationErrors: err.errors
                })
            });
        });
};

exports.deleteCandidate = (req, res, next) => {
    const hrId = req.params.hrmanagerId;
    HrManagerRepository.deleteHrManager(hrId)
        .then( () => {
            res.redirect('/hrmanagers');
        });
};
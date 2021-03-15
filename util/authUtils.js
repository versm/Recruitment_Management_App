const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedHrManagerUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(typeof loggedUser !== 'undefined' && loggedUser.hrManager_id != null) {
        next();
    } else {
        throw new Error('unauthorized access');
    }
}

exports.permitAuthenticatedAllUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(typeof loggedUser !== 'undefined' && (loggedUser.candidate_id != null || loggedUser.hrManager_id != null)) {
        next();
    } else {
        throw new Error('unauthorized access');
    }
}


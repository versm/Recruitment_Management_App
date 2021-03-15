const UserRepository = require('../repository/sequelize/UserRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    UserRepository.findByEmail(email)
        .then(user => {
            if(!user) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, user.password) === true) {
                req.session.loggedUser = user;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}



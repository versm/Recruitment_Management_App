const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const User = sequelize.define('User', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [5,60],
                msg: "validationMessage.numberOfCharactersRequired"
            },
            isEmail: {
                msg: 'validationMessage.incorrectEmail'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [5,60],
                msg: "validationMessage.numberOfCharactersRequired"
            }
        }
    },
    candidate_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    hrManager_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = User;

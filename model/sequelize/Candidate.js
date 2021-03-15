const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Candidate = sequelize.define('Candidate', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len:{
                args: [2,60],
                msg: "validationMessage.numberOfCharactersRequired"
            }
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len:{
                args: [2,60],
                msg: "validationMessage.numberOfCharactersRequired"
            }
        }
    },
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [9],
                msg: "validationMessage.incorrectPhoneNumber"
            },
            is: {
                args: ["^[0-9]+$", 'i'],
                msg: "validationMessage.incorrectPhoneNumber"
            }
        }
    },

});

module.exports = Candidate;

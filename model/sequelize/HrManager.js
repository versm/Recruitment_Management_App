const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const HrManager = sequelize.define('HrManager', {
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
            len: {
                args: [2, 60],
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
            len: {
                args: [2, 60],
                msg: "validationMessage.numberOfCharactersRequired"
            }
        }
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            isInt: {
                args: true,
                msg: "validationMessage.incorrectInteger"
            },
            min: {
                args: 2000,
                msg: "validationMessage.incorrectRange"
            },
            max: {
                args: 100000,
                msg: "validationMessage.incorrectRange"
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [20, 250],
                msg: "validationMessage.numberOfCharactersRequired"
            }
        }
    }
});

module.exports = HrManager;
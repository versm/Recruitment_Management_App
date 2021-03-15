const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Interview = sequelize.define('Interview', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "validationMessage.fieldRequired"
            }
        }
    },
    place: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            nullValidator(value) {
                if (value === null && this.isOnline === false) {
                    throw new Error("validationMessage.fieldRequired");
                }
            },
            isPlaceRequired(value) {
                if (value !== null && this.isOnline === true) {
                    throw new Error("validationMessage.noPlaceRequired");
                }
            },
            len:{
                args: [10,120],
                msg: "Pole powinno zawierać od 10 do 120 znaków"
            }
        }
    },
    recruitmentStage: {
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
                args: 1,
                msg: "validationMessage.incorrectRange"
            },
            max: {
                args: 3,
                msg: "validationMessage.incorrectRange"
            }
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            isDate: {
                args: true,
                msg: "validationMessage.invalidDateFormat"
            },
            isAfter:{
                args: ''+new Date(),
                msg: "validationMessage.invalidDate"
            }
        }
    },
    candidate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            isInt: {
                args: true,
                msg: "validationMessage.incorrectInteger"
            }
        }
    },
    hrManager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            isInt: {
                args: true,
                msg: "validationMessage.incorrectInteger"
            }
        }
    }
});

module.exports = Interview;
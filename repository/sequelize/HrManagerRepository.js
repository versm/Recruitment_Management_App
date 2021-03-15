const Candidate = require("../../model/sequelize/Candidate");
const HrManager = require("../../model/sequelize/HrManager");
const Interview = require("../../model/sequelize/Interview");
const User = require("../../model/sequelize/User");
const sequelize = require('../../config/sequelize/sequelize');
const authUtil = require('../../util/authUtils');


exports.getHrManagers = () => {
    return HrManager.findAll({
        include: [
            {
                model: User,
                as: 'user'
            }]
    });
};

exports.getHrManagerById = (hrmId) => {
    return HrManager.findByPk(hrmId,
        {
            include: [{
                model: Interview,
                as: 'interviews',
                include: [{
                    model: Candidate,
                    as: 'candidate'
                }]
            },
            {
                model:User,
                as: 'user'
            }]
        });
};

exports.createHrManager = async (newHrmData) => {
    const t = await sequelize.transaction();

    try {
        const hr = await HrManager.create({
            firstName: newHrmData.firstName,
            lastName: newHrmData.lastName,
            salary: newHrmData.salary,
            description: newHrmData.description
        }, {transaction: t});

        const u = await User.create({
            email: newHrmData.email,
            password: authUtil.hashPassword(newHrmData.password),
            candidate_id: null,
            hrManager_id: hr._id
        }, {transaction: t});
        return t.commit();
    } catch (err) {
        t.rollback();
        throw err;
    }
};

exports.updateHrManager = (hrmId, hrmData) => {
    return HrManager.update(hrmData, {where: {_id: hrmId }});
};

exports.deleteHrManager = (hrmId) => {
    return HrManager.destroy({
        where: { _id: hrmId }
    });

};
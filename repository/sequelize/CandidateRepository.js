const Candidate = require("../../model/sequelize/Candidate");
const HrManager = require("../../model/sequelize/HrManager");
const Interview = require("../../model/sequelize/Interview");
const User = require("../../model/sequelize/User");
const sequelize = require('../../config/sequelize/sequelize');

const authUtil = require('../../util/authUtils');

exports.getCandidates = () => {
    return Candidate.findAll({
        include: [
            {
                model: User,
                as: 'user'
            }]
    });
};

exports.getCandidateById = (candId) => {
    return Candidate.findByPk(candId,
        {
            include: [{
                model: Interview,
                as: 'interviews',
                include: [{
                    model: HrManager,
                    as: 'hrManager'
                }]
            },
            {
                model:User,
                as: 'user'
            }]
        });
};

exports.createCandidate = async (newCandData) => {
    const t = await sequelize.transaction();
    try {
        const cdn = await Candidate.create({
            firstName: newCandData.firstName,
            lastName: newCandData.lastName,
            phoneNumber: newCandData.phoneNumber
        }, {transaction: t});

        const u = await User.create({
            email: newCandData.email,
            password: authUtil.hashPassword(newCandData.password),
            candidate_id: cdn._id,
            hrManager_id: null
        }, {transaction: t});
        return t.commit();
    } catch (err) {
        t.rollback();
        throw err;
    }
};

exports.updateCandidate = (candId, candData) => {
    return Candidate.update(candData, {where: {_id: candId }});
};

exports.deleteCandidate = (candId) => {
    return Candidate.destroy({
        where: { _id: candId }
    });

};
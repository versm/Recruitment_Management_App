const Sequelize = require('sequelize');

const User = require("../../model/sequelize/User");
const Candidate = require("../../model/sequelize/Candidate");
const HrManager = require("../../model/sequelize/HrManager");

const authUtil = require('../../util/authUtils');

exports.findByEmail = (email) => {
    return User.findOne({
        where: {email: email},
        include: [
            {
                model: Candidate,
                as: 'candidate'
            },
            {
                model: HrManager,
                as: 'hrManager'
            }]
    });
};

exports.createCandidateUser = (newCandData, cnd) => {
    return User.create({
        email: newCandData.email,
        password: authUtil.hashPassword(newCandData.password),
        candidate_id: cnd._id,
        hrManager_id:null
    });
};

exports.createHrManagerUser = (newHrManData, hr) => {
    return User.create({
        email: newHrManData.email,
        password: authUtil.hashPassword(newHrManData.password),
        candidate_id: null,
        hrManager_id:hr._id
    });
};

exports.updateCandidateUser = (cndId, cndData) => {
    cndData.password=authUtil.hashPassword(cndData.password);
    return User.update(cndData,{where: {candidate_id: cndId }});
};

exports.updateHrManagerUser = (hrId, hrData) => {
    hrData.password=authUtil.hashPassword(hrData.password);
    return User.update(hrData,{where: {hrManager_id: hrId }});
};



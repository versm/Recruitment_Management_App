const Sequelize = require('sequelize');

const Candidate = require("../../model/sequelize/Candidate");
const HrManager = require("../../model/sequelize/HrManager");
const Interview = require("../../model/sequelize/Interview");

exports.getInterviews = () => {
    return Interview.findAll({include: [
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

exports.getCandidatesInterviews = (cndId) => {
    return Interview.findAll({
        where: {candidate_id:cndId},
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


exports.getInterviewById = (interviewId) => {
    return Interview.findByPk(interviewId, {include: [
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

exports.createInterview = (data) => {

    return Interview.create({
        candidate_id: data.candidate_id,
        hrManager_id: data.hrManager_id,
        date: data.date,
        isOnline: data.isOnline,
        place: data.place==''? null : data.place,
        recruitmentStage: data.recruitmentStage
    });
};

exports.updateInterview = (interviewId, data) => {
    if(data.place==='')
        data.place=null;
    return Interview.update(data, {where: {_id: interviewId }});
}

exports.deleteInterview = (interviewId) => {
    return Interview.destroy({
        where: { _id: interviewId }
    });
}

exports.deleteManyInterviews = (interviewIds) => {
    return Interview.find({ _id: { [Sequelize.Op.in]: interviewIds }})
}


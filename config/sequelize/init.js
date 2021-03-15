const sequelize = require('./sequelize');

const Candidate = require('../../model/sequelize/Candidate');
const HrManager = require('../../model/sequelize/HrManager');
const Interview = require('../../model/sequelize/Interview');
const User = require('../../model/sequelize/User');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Candidate.hasMany(Interview, {as: 'interviews', foreignKey: {name: 'candidate_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Interview.belongsTo(Candidate, {as: 'candidate', foreignKey: {name: 'candidate_id', allowNull: false} } );
    HrManager.hasMany(Interview, {as: 'interviews', foreignKey: {name: 'hrManager_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Interview.belongsTo(HrManager, {as: 'hrManager', foreignKey: {name: 'hrManager_id', allowNull: false} });

    Candidate.hasOne(User,{as: 'user', foreignKey: {name: 'candidate_id', allowNull: true}, constraints: true, onDelete: 'CASCADE'});
    User.belongsTo(Candidate, {as: 'candidate', foreignKey: {name: 'candidate_id', allowNull: true} });
    HrManager.hasOne(User, {as: 'user', foreignKey: {name: 'hrManager_id', allowNull: true}, constraints: true, onDelete: 'CASCADE'});
    User.belongsTo(HrManager, {as: 'hrManager', foreignKey: {name: 'hrManager_id', allowNull: true} });

    let allCands, allHrs;
    return sequelize
        .sync({force: false})
        .then( () => {
            return Candidate.findAll();
        })
        .then(cands => {
            if( !cands || cands.length == 0 ) {
                return Candidate.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', phoneNumber: '678345721' },
                    {firstName: 'Adam', lastName: 'Zieliński', phoneNumber: '670316792'},
                    {firstName: 'Marian', lastName: 'Nowak', phoneNumber: '348096835'}
                ])
                    .then( () => {
                        return Candidate.findAll();
                    });
            } else {
                return cands;
            }
        })
        .then( cands => {
            allCands = cands;
            return HrManager.findAll();
        })
        .then( hrs => {
            if( !hrs || hrs.length == 0 ) {
                return HrManager.bulkCreate([
                    {firstName: 'Ola', lastName: 'Nowak', salary: 5000, description: 'Ola posiada ponad 10 lat doświadczenia w działach Human Resources, od 5 lat w TBHC jako lider zespołu HR. Zajmuje się opracowywaniem, wdrażaniem i realizacją strategii talentowej.' },
                    {firstName: 'Marta', lastName: 'Dąbrowska', salary: 4500, description: 'Marta pracuje w TBHC od 2 lat, zajmuje się rekrutacjami w dziale IT oraz opracowywaniem spersonalizowanych ścieżek rozwoju' },
                    {firstName: 'Katarzyna', lastName: 'Kruk', salary: 6000, description: '10 lat temu zaczynała pracę jako Junior HR Manager, obecnie jest członkiem zarządu TBHC. Nie zrezygnowała jednak z prowadzenia rozmów rekrutacyjnych, które jak mówi, sprawiają jej ogromną przyjemność.' },
                ])
                    .then( () => {
                        return HrManager.findAll();
                    });
            } else {
                return hrs;
            }
        })
        .then( hrs => {
            allHrs = hrs;
            return Interview.findAll();
        })
        .then( intvws => {
            if( !intvws || intvws.length == 0 ) {
                return Interview.bulkCreate([
                    {candidate_id: allCands[0]._id, hrManager_id: allHrs[0]._id, isOnline:true, place: null, date: '2021-02-20', recruitmentStage:1},
                    {candidate_id: allCands[0]._id, hrManager_id: allHrs[1]._id, isOnline:true, place: null, date: '2021-03-20', recruitmentStage:2},
                    {candidate_id: allCands[1]._id, hrManager_id: allHrs[1]._id, isOnline:false, place: 'Warszawa, ul. Jana Pawła II 20', date: '2021-02-20', recruitmentStage:1},
                    {candidate_id: allCands[2]._id, hrManager_id: allHrs[2]._id, isOnline:false, place: 'Warszawa, ul. Jana Pawła II 20', date: '2021-04-20', recruitmentStage:1}
                ]);
            } else {
                return intvws;
            }
        })
        .then( intvws => {
            return User.findAll();
        })
        .then( users => {
            if( !users || users.length == 0 ) {
                return User.bulkCreate([
                    {email: 'jan.kowalski@gmail.com', password: passHash, candidate_id: allCands[0]._id, hrManager_id:null },
                    {email: 'adam.zielinski@gmail.com', password: passHash, candidate_id: allCands[1]._id, hrManager_id: null },
                    {email: 'marian.nowak@gmail.com', password: passHash, candidate_id: allCands[2]._id, hrManager_id: null },
                    {email: 'ola.nowak@tbhc.com', password: passHash, candidate_id: null, hrManager_id:allHrs[0]._id},
                    {email: 'marta.dabrowska@tbhc.com', password: passHash, candidate_id: null, hrManager_id:allHrs[1]._id},
                    {email: 'katarzyna.kruk@tbhc.com', password: passHash, candidate_id: null, hrManager_id:allHrs[2]._id},
                ]);
            } else {
                return users;
            }
        });
};


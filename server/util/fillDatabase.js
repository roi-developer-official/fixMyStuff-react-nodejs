const sequelize = require('./database');
const ProfessionName = require('../models/profession_name');
const Experience = require('../models/experience');
const RoleName = require('../models/role_name');


(async function fillDb(){
    await sequelize.sync({force:true});
    await ProfessionName.bulkCreate([
        {name: 'Carpenter'},
        {name: 'Electrician'},
        {name: 'Mechanic'},
        {name: 'Painter'},
        {name: 'Plumber'},
        {name: 'Tailor'},
        {name: 'Bricklayer'},
        {name: 'Window cleaner'},
        {name: 'Cleaner'},
        {name: 'other'}]
        );
    
    await Experience.bulkCreate([
        {name: 'none'},
        {name: '1-2 years'},
        {name: '2-3 years'},
        {name: '3-4 years'},
        {name: '5 or more years'},
    ]);
    
    await RoleName.bulkCreate([
        {name: 'offer', roleId: 1},
        {name: 'bidder', roleId: 2},
    ]);

})()

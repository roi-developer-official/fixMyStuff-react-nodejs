const Experience = require('../models/experience');
const Password = require('../models/password');
const Profession = require('../models/peofession');
const ProfessionName = require('../models/profession_name');
const Role = require('../models/role');
const RoleName = require('../models/role_name');
const User = require('../models/user');


(function setRelations(){
    User.hasMany(Role);
    Role.belongsTo(User);
    User.hasOne(Password);
    Password.belongsTo(User);
    User.hasOne(Profession);
    Profession.belongsTo(User);
    Experience.hasOne(Profession);
    Profession.belongsTo(Experience);
})();
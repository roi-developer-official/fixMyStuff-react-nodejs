const sequalize = require('../util/database');
const {DataTypes} = require('sequelize');
const User = require('./user');
const Experience = require('./experience');

const Profession = sequalize.define('profession',{
    professionId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    experienceId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Experience,
            key: 'id'
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps:false
});

User.hasOne(Profession);
Profession.belongsTo(User);
Experience.hasOne(Profession);
Profession.belongsTo(Experience);
module.exports = Profession;
const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');

const Experience = sequalize.define('experience',{
    name:
    {
        type: DataTypes.STRING,
        allowNull:true
    }

}, {
    timestamps:false
});

module.exports = Experience;
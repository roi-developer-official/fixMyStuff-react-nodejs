const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');

const ProfessionName = sequalize.define('profession_name',{
    name: DataTypes.STRING
}, {
    timestamps:false
});

module.exports = ProfessionName;
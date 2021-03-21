const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');

const RoleName = sequalize.define('role_name',{
    name: DataTypes.STRING
}, {
    timestamps:false
});


module.exports = RoleName;
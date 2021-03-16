const sequalize = require('../util/database');
const {DataTypes} = require('sequelize');

const Role = sequalize.define('role',{
    roleId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps:false
});

module.exports = Role;
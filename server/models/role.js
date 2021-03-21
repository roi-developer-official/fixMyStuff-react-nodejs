const sequalize = require('../util/database');
const {DataTypes} = require('sequelize');
const User = require('./user');

const Role = sequalize.define('role',{
    roleId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        },
        allowNull:false
    }
}, {
    timestamps:false
});

User.hasMany(Role);
Role.belongsTo(User);

module.exports = Role;
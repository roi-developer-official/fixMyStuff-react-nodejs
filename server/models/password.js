const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');

const Password = sequalize.define('password',{
    value:{
        type: DataTypes.STRING,
        allowNull:false
    },
}, {
    timestamps:false
});

module.exports = Password;
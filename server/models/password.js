const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');
const User = require('./user');

const Password = sequalize.define('password',{
    value:{
        type: DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps:false
});

User.hasOne(Password);
Password.belongsTo(User);

Password.addScope('findByUserId', (userId)=>{
    return {
        where: {
            userId: userId
        }
    }
});

module.exports = Password;
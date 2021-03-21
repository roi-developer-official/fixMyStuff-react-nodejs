const { DataTypes} = require('sequelize')
const sequelize = require('../util/database')

const User = sequelize.define('user',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    city:{
        type: DataTypes.STRING,
        allowNull:false
    },
    image:{
        type: DataTypes.STRING,
        allowNull:true
    }
    
});

User.addScope('findByEmail',(email)=>{
    return {
        where:{
            email : email
        }
    }
});

module.exports = User;
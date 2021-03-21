const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');

const Experience = sequalize.define('experience',{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull:true
    }
}, {
    timestamps:false
});

Experience.addScope('findByName', (name)=>{
    return {
        where:{
            name: name
        }
    }
});
module.exports = Experience;
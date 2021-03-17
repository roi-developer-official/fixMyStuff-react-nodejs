const sequelize = require("../util/database");
const {DataTypes} = require('sequelize')
const Bid = sequelize.define('Bid', 
{
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:true,
            min:0
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Bid;
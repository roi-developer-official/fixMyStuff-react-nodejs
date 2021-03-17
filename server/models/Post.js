const sequelize = require("../util/database");
const {DataTypes} = require('sequelize');


const Post = sequelize.define('Post',
{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    manPayment:{
        type: DataTypes.INTEGER,
        allowNull:true,
        validate:{
            isInt:true,
            min:0
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    }
});


module.exports = Post;
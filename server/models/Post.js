const sequelize = require("../util/database");
const {DataTypes} = require('sequelize');
const User = require("./user");

const Post = sequelize.define('Post',
{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    maxPayment:{
        type: DataTypes.INTEGER,
        allowNull:true,
        validate:{
            isNumeric:true,
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
    },
    userId:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "id",
        },
        allowNull: false
    }
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;
const sequelize = require("../util/database");
const {DataTypes} = require('sequelize');
const Post = require("./Post");
const User = require("./user");
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
    },
    postId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Post,
            key: 'id'
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
    
});

User.hasMany(Bid);
Bid.belongsTo(User);
Post.hasMany(Bid);
Bid.belongsTo(Post);

module.exports = Bid;
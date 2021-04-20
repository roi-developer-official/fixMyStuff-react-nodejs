const sequelize = require("../util/database");
const {DataTypes} = require('sequelize');
const User = require("./user");
const { deleteFile } = require("../util/deleteFile");

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
            isInt:true,
            min:0
        }
    },
    description:{
        type: DataTypes.TEXT,
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

Post.beforeBulkDestroy((posts) => {
    let ids = posts.where.id;
    ids.forEach(async (id) => {
      let post = await Post.findOne({ where: { id: id } });
      let postImage = post.getDataValue("image");
      let isImageExists = postImage !== "null" && postImage !== "";
      if (isImageExists) {
        deleteFile(postImage);
      }
    });
  });

module.exports = Post;
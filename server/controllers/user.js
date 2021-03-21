const sequelize = require('../util/database');
const User = require('../models/user');
const Post = require('../models/Post');
const {throwError} = require('../util/throwError');
const deleteFile = require('../util/deleteFile').deleteFile;

module.exports.createPost = async (req,res,next)=>{

    const user = req.user;
    
    const id = user.id;
    const data = req.body;
    let image = null;

    if(req.file)
      image = req.file.path;
    
    const post = await Post.create({
      title: data.title,
      maxPayment: data.maxPayment, 
      description: data.description,
      image: image,
      userId: id
    });

    if(!post){
      if(req.file)
        deleteFile(req.file.path);
      return throwError('somthing went wrong', 500, next);
    }
    else 
      res.status(200).send('post created');
  }




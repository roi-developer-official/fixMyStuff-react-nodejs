const sequelize = require('../util/database');
const User = require('../models/user');
const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const {throwError,validateInputs} = require('../util/throwError');
const deleteFile = require('../util/deleteFile').deleteFile;
const jwt = require('jsonwebtoken');

module.exports.createPost = async (req,res,next)=>{

  if(validateInputs(validationResult(req)))
    {
      if(req.file){
        deleteFile(req.file.path);
      }
      return throwError('Invalid input',400,next);
    }

    const token = req.cookies.connect;
    if(!token){
        return throwError('un-authenticated',401,next);
    }
    const decoded = jwt.verify(req.cookies.connect,process.env.TOKEN_SECRET);
    let user;
    if(decoded){
          user = await User.findOne({
            where:{
                email : decoded.email
            },
            attributes:['id','email']
    });

    }
  
    if(user && user.getDataValue("email") !== req.body.email)
      return throwError('un-authorized',401, next);
    else {
    const id = user.getDataValue("id");
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


}




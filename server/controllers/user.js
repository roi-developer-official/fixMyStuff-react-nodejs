const sequelize = require('../util/database');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const {throwError,validateInputs} = require('../util/throwError');


module.exports.addPost = (req,res,next)=>{
    if(validateInputs(validationResult(req)))
    {
      return throwError('Invalid input',400,next);
    }
    


    


}



const {validationResult} = require('express-validator');
const deleteFile = require('../util/deleteFile').deleteFile;
module.exports.validate = validations =>{
    return async (req,res,next)=>{
        await Promise.all(
            validations.map(validation=>validation.run(req)));
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        
        if(req.file){
            deleteFile(req.file.path);
        }

        const error = new Error();
        error.message = errors.array()[0].msg;
        error.code = 401;
        error.invalidInputs = errors.array();
        return next(error);
    };
};



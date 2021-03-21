const express = require('express')
const router = express.Router();
const { body, cookie } = require('express-validator');
const inputValidation = require('../util/inputValidation').validate;
const userController = require('../controllers/user');
const decodeJwt = require('jwt-decode');
const User = require('../models/user');

const validateUserIntegrity = async(value,req)=>{
    const decoded = decodeJwt(value);
    let user = await User.scope({method:['findByEmail',decoded.email]}).findOne({attributes:['id', 'email']});
    if(!user || user.toJSON().email !== req.body.email){
        return Promise.reject('no user with that email');
    }
    req.user = user.toJSON()
}

router.post('/create-post',
inputValidation([
    body('title').notEmpty().isString().trim().escape(),
    body('maxPayment').optional().isNumeric({min:0}).escape(),
    body('description').notEmpty().isString().trim().escape(),
    body('email').notEmpty().isEmail().escape(),
    body('image').optional().escape(),
    cookie('connect')
    .custom(async(value, {req})=>{
        return validateUserIntegrity(value,req);
    })
]) , userController.createPost);








module.exports = router;
const express = require('express')
const router = express.Router();
const { body, cookie } = require('express-validator');
const userController = require('../controllers/user');
const decodeJwt = require('jwt-decode');
const User = require('../models/user');
router.post('/create-post',[
    body('title').notEmpty().isString().trim().escape(),
    body('maxPayment').optional().isNumeric({min:0}).escape(),
    body('description').notEmpty().isString().trim().escape(),
    body('email').notEmpty().isEmail().escape(),
    body('image').optional(),
    cookie('connect').customSanitizer(async(value, {req})=>{
        
        const decoded = decodeJwt(value);
        let user = await User.scope({method:['findByEmail','tset@tst.con']}).findOne({attributes:['id', 'email']});
        if(!user || user.toJSON().email !== req.body.email){
            return Promise.reject({message: 'no user with that email',code : 401});
        }
        return user.toJSON();
        
    })
    
], userController.createPost);




module.exports = router;
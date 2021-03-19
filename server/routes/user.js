const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user');

router.post('/create-post',[
    body('title').notEmpty().isString().trim().escape(),
    body('maxPayment').optional().isNumeric({min:0}).escape(),
    body('description').notEmpty().isString().trim().escape(),
    body('email').notEmpty().isEmail().escape(),
    body('image').optional()
], userController.createPost);




module.exports = router;
const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user');

router.post('/addpost',[
    body('title').notEmpty().isString().trim().escape(),
    body('maxPayment').optional().isInt({min:0}).escape(),
    body('description').notEmpty().isString().trim().escape(),
    body('image').optional().trim().escape()
], userController.addPost);




module.exports = router;
const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');

router.post('/signup', [
    body('firstName').notEmpty().isString().trim().escape(),
    body('lastName').notEmpty().isString().trim().escape(),
    body('city').notEmpty().isString().trim().escape(),
    body('image').optional(),
    body('email').notEmpty().isEmail().normalizeEmail().trim().escape(),
    body('role').notEmpty().isInt().escape(),
    body('password').notEmpty().isString().isLength({min:8, max:255}).trim().escape(),
    body('profession').optional().isString().trim().escape()
],authController.signUp);

router.post('/login',[
    body('email').notEmpty().isString().isEmail().normalizeEmail().trim().escape(),
    body('password').notEmpty().isString().isLength({min:8}).trim().escape()
], authController.login);

router.get('/refresh', authController.refreshPage);

router.get('/logout', authController.logout);

module.exports = router;
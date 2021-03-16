const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');

router.post('/signup', [
    body('firstName').escape().trim().isString().notEmpty(),
    body('lastName').escape().isString().trim().notEmpty(),
    body('city').escape().trim().isString().notEmpty(),
    body('image').trim().escape(),
    body('email').escape().trim().isEmail().normalizeEmail().notEmpty(),
    body('role').isInt().notEmpty(),
    body('password').escape().isString().trim().notEmpty().isLength({min:8, max:255}),
    body('profession').escape().isString().trim().optional()
],authController.signUp);

router.post('/login',[
    body('email').escape().isString().trim().normalizeEmail().notEmpty(),
    body('password').escape().isString().trim().notEmpty().isLength({min:8})
], authController.login);

router.get('/refresh', authController.refreshPage);

router.get('/logout', authController.logout);

module.exports = router;
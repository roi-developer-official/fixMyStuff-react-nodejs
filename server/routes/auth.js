const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const User = require("../models/user");
const { body } = require("express-validator");
const inputValidation = require('../util/inputValidation').validate;

router.post(
  "/signup",
  inputValidation([
    body("firstName").notEmpty().isString().trim().escape(),
    body("lastName").notEmpty().isString().trim().escape(),
    body("city").notEmpty().isString().trim().escape(),
    body("image").optional(),
    body("email").notEmpty().trim().isEmail().normalizeEmail()
      .custom(async (value) => {

        const user = await User.scope({method: ["findByEmail", value],})
        .findOne();
          if (user) {
            return Promise.reject("user with that email already exists");
          }
         return value;

      })
      .escape(),
    body("role").notEmpty().isInt().escape(),
    body("password").notEmpty().isString().isLength({ min: 8, max: 255 })
      .trim()
      .escape(),
    body("profession").optional().isString().trim().escape(),
  ]),
  authController.signUp
);

router.post(
  "/login",
  inputValidation([
    body("email").notEmpty().isString().isEmail().normalizeEmail().trim()
    .custom(async(value, {req})=>{
        
        const user = await User.scope({method:['findByEmail',value]}).findOne();
        if(!user){
          return Promise.reject("Invalid email or password");
        }
        else{
          req.user = user;
        }

      })
      .escape(),
    body("password").notEmpty().isString().isLength({ min: 8 }).trim().escape(),
  ]),
  authController.login
);

router.get("/refresh", authController.refreshPage);

router.get("/logout", authController.logout);

module.exports = router;

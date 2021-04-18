const express = require("express");
const router = express.Router();
const { body, cookie, query, param } = require("express-validator");
const inputValidation = require("../util/inputValidation").validate;
const userController = require("../controllers/user");
const decodeJwt = require("jwt-decode");
const User = require("../models/user");

const validateUserIntegrity = async (value, req) => {
  const decoded = decodeJwt(value);
  let user = await User.scope({
    method: ["findByEmail", decoded.email],
  }).findOne({ attributes: ["id", "email"] });
  if (!user) {
    return Promise.reject("no user with that email");
  }
  req.user = user.toJSON();
};

router.post(
  "/create-post",
  inputValidation([
    body("title").notEmpty().isString().trim().escape(),
    body("maxPayment").optional().isNumeric({ min: 0 }),
    body("description").optional().isString().trim().escape(),
    body("image").optional().escape(),
  ]),
  cookie("connect").custom(async (value, { req }) => {
    return validateUserIntegrity(value, req);
  }),
  userController.createPost
);

router.get(
  "/posts",
  inputValidation([
    query("page")
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .customSanitizer((value) => {
        return parseInt(value);
      })
      .isInt(),
    query("order").notEmpty().isString().escape(),
  ]),
  cookie("connect")
    .notEmpty()
    .custom((value, { req }) => {
      return validateUserIntegrity(value, req);
    })
    .escape(),
  userController.getPosts
);

router.post(
  "/delete-posts",
  inputValidation([body("deleted").notEmpty().isArray()]),
  cookie("connect")
    .notEmpty()
    .custom((value, { req }) => {
      return validateUserIntegrity(value, req);
    })
    .escape(),
  userController.deletePosts
);

router.get(
  "/single-post/:id",
  param("id").notEmpty().isString().escape(),
  cookie("connect")
    .notEmpty()
    .custom((value, { req }) => {
      return validateUserIntegrity(value, req);
    })
    .escape(),
  userController.getSinglePost
);

router.post(
  "/edit-post/:id",
  inputValidation([
    body("title").notEmpty().isString().trim().escape(),
    body("maxPayment").optional().isNumeric({ min: 0 }),
    body("description").optional().isString().trim().escape(),
    body("image").optional().escape(),
  ]),
  cookie("connect").custom(async (value, { req }) => {
    return validateUserIntegrity(value, req);
  }),
  userController.editPost
);


module.exports = router;

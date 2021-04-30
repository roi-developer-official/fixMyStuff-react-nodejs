const User = require("../models/user");
const Password = require("../models/password");
const Profession = require("../models/profession");
const Role = require("../models/role");
const Experience = require("../models/experience");
const sequelize = require("../util/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const getToken = require("../util/token").getToken;
const { throwError } = require("../util/throwError");
const deleteFile = require("../util/deleteFile").deleteFile;
const ProfessionName = require("../models/profession_name");
require("dotenv").config();

const LOGIN_FAIL = "Invalid email or password";
const TOKEN_EXPIRY = 3600000;

module.exports.signUp = async (req, res, next) => {
  const data = req.body;

  let { password, profession, experience } = data;
  let roleId = Number.parseInt(data.selectedRole);
  delete data["password"];
  delete data["selectedRole"];
  delete data["profession"];
  delete data["experience"];
  data.image === req.file ? req.file.path : null;

  let result;
  let professionId;
  let experienceId;
  const hash = await bcrypt.hash(password, 12);

  try {
    result = await sequelize.transaction(async (t) => {
      let user = await User.create({ ...data }, { transaction: t });
      await Password.create(
        { value: hash, userId: user.id },
        { transaction: t }
      );
      await Role.create(
        { roleId: roleId, userId: user.id },
        { transaction: t }
      );

      if (roleId === 1) {
        professionId = await ProfessionName.scope({
          method: ["findByName", profession],
        }).findOne({ attributes: ["id"], transaction: t });
        experienceId = await Experience.scope({
          method: ["findByName", experience],
        }).findOne({ attributes: ["id"], transaction: t });

        professionId = professionId.id;
        experienceId = experienceId.id;

        await Profession.create(
          {
            professionId: professionId,
            experienceId: experienceId,
            userId: user.getDataValue("id"),
          },
          { transaction: t }
        );
      }

      return user;
    });
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return next(error);
  }

  const {
    firstName,
    lastName,
    email,
    image,
    city,
    createdAt,
    updatedAt,
  } = result.dataValues;
  
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    image: image,
    city: city,
  };

  let output = {
    user: user,
    expiresIn: TOKEN_EXPIRY,
  };
  const token = getToken(email, createdAt, updatedAt);
  res.cookie("connect", token, {
    httpOnly: true,
    sameSite: true,
    maxAge: TOKEN_EXPIRY,
    secure: process.env.NODE_ENV !== "development" ? true : false,
  });

  res.status(201).json(output);
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = req.user;
  const hash = await Password.findOne({ where: { userId: user.id } });
  const { firstName, lastName, city, createdAt, image, updatedAt } = user;

  try {
    const match = await bcrypt.compare(password, hash.value);

    if (match) {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        city: city,
        image: image,
      };
      let output = {
        user: user,
        expiresIn: TOKEN_EXPIRY,
      };

      const token = getToken(email, createdAt, updatedAt);
      res.cookie("connect", token, {
        httpOnly: true,
        sameSite: true,
        maxAge: TOKEN_EXPIRY,
        secure: process.env.NODE_ENV !== "development" ? true : false,
      });

      res.status(200).json(output);
    } else {
      throwError(LOGIN_FAIL, 401, next);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.refreshPage = async (req, res, next) => {
  const token = req.cookies.connect;
  if (!token) {
    return res.status(200).json({ message: "no token" });
  } else {
    try {
      const decoded = jwt.verify(req.cookies.connect, process.env.TOKEN_SECRET);

      if (decoded) {
        const user = await User.scope({
          method: ["findByEmail", decoded.email],
        }).findOne({
          attributes: ["firstName", "lastName", "image", "email", "city"],
        });
        const output = {
          user: user,
          expiresIn: decoded.exp,
        };
        return res.status(200).json(output);
      }
    } catch (error) {
      return next(error);
    }
  }
};

module.exports.logout = (req, res, next) => {
  res.clearCookie("connect");
  res.sendStatus(200);
};

const { validationResult } = require('express-validator');
const User = require('../models/user');
const Password = require('../models/password');
const Profession = require('../models/peofession');
const Role = require('../models/role');
const ProfessionName = require('../models/profession_name');
const Experience = require('../models/experience');
const sequelize = require('../util/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const GENERIC_ERROR = 'something went wrong!';
const USER_CREATED = 'user created succesfully!';
const USER_ALREADY_EXSISTS = 'user with that email is already exsits';
const LOGIN_FAIL = 'email or password invalid';

const TOKEN_EXPIRY = 3600000;
function validateInput(errors){

    if(!errors.isEmpty()){
        let message = '';
        for(let i of errors.array()){
            message += i.param + ':' + i.msg + ', '
        }
        throw message;
    }
}

function returnToken(email, createdAt,updatedAt,image){

    if(!email || !createdAt)
        throw new Error('returnToken not implemented currect')

    const token =  jwt.sign({
        email:email, 
        createdAt:createdAt,
        updatedAt: updatedAt,
        image: image
    }, process.env.TOKEN_SECRET,{
        expiresIn: '1h',
        algorithm: 'HS256'
    });

    return token;
}

function throwError(message,code,next){
    const error = new Error();
    error.code = code;
    error.message = message;
    return next(error);
}


module.exports.signUp = async (req,res,next)=>{
    validateInput(validationResult(req));
    let isEmailExsists = await User.findOne({
        where: {
           email: req.body.email
        }
    });

    if(isEmailExsists){
       return throwError(USER_ALREADY_EXSISTS, 401 , next);
    }

    const data = req.body;
    if(req.file)
        Object.defineProperty(data,'image',{
            value: req.file.path
    });

    let password = data.password;
    delete data['password'];
    let roleId = data.role;
    delete data['role'];
    let professionName = data.profession;
    delete data['profession'];
    let experienceName = data.experience;
    delete data['experience'];
 
    let result;
    let professionId;
    let experienceId;
    try {
         result = await sequelize.transaction(async (t)=>{
                let user = await User.create({...data},{transaction:t});
                Password.build({value:password,userId: user.id},{transaction:t}).save();
                await Role.create({ roleId:roleId ,userId:user.id },{transaction:t});

            if(roleId === 2){
                professionId = await ProfessionName.findOne({
                    where: {
                        name : professionName
                    },
                    attributes: ['id']
                });

                experienceId = await Experience.findOne({
                    where:{
                        name: experienceName
                    },
                    attributes:['id']
                });
    
                professionId = professionId.dataValues.id;
                experienceId = experienceId.dataValues.id;

                await Profession.create({
                    userId: user.id, 
                    professionId: professionId,
                    experienceId: experienceId},{transaction:t});
                }

                return user;
        })
    } 
     catch (error) {
         console.log(error);
        return next(error);
    }

    const {firstName, lastName, email,image, createdAt,updatedAt}  = result.dataValues;
    const user = {
        firstName: firstName,
        lastName : lastName,
        image: image
    }


    let output = {
            user: user,
            expiresIn: TOKEN_EXPIRY
    };

    const token = returnToken(email,createdAt,updatedAt,image);
    res.cookie('connect', token,{
        httpOnly: true,
        sameSite: true,
        maxAge: TOKEN_EXPIRY,
        secure: process.env.NODE_ENV !== "development" ? true : false
    });
    res.status(201).json(output);
}

module.exports.login = async(req,res,next)=>{

    validateInput(validationResult(req));
    const {email, password} = req.body;


    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if(!user){
        return throwError(LOGIN_FAIL, 401, next);
    }

    const {id: userId, firstName, lastName,createdAt,image,updatedAt} = user.dataValues;

    const hash = await Password.findOne({
        where:{
         userId : userId
        }
    });

    const match = await bcrypt.compare(password,hash.dataValues.value);
    if(match){
        const user = {
            firstName : firstName,
            lastName : lastName,
            image:image
        }

        let output = {
            user: user,
            expiresIn: TOKEN_EXPIRY
        }

        const token = returnToken(email,createdAt,updatedAt,image);
        res.cookie('connect', token,{
            httpOnly: true,
            sameSite: true,
            maxAge: TOKEN_EXPIRY,
            secure: process.env.NODE_ENV !== "development" ? true : false
        });
        res.status(200).json(output);
    } else{
        throwError(LOGIN_FAIL, 401,next)
    }
}


module.exports.refreshPage = async (req,res,next)=>{

    const token = req.cookies.connect;
    if(!token){
        return res.status(200).send('unauthenticated');
    }
    else {
        const decoded = jwt.verify(req.cookies.connect,process.env.TOKEN_SECRET);
        if(decoded){
            let user = await User.findOne({
                where:{
                    email : decoded.email
                },
                attributes:['firstName' , 'lastName', 'image']
            });
            user = user.dataValues;
            const output ={
                user: user,
                expiresIn: decoded.exp
            }
         
           return res.status(200).json(output);
        }
    }
    res.status(200).send('token expired');

}


module.exports.logout = (req,res,next)=>{
    res.clearCookie('connect');
    res.send('loggedout')
}
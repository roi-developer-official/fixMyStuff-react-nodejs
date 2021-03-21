const jwt = require('jsonwebtoken');
const TOKEN_EXPIRY = 3600000;

const getToken = function(email, createdAt,updatedAt){

    if(!email || !createdAt || !updatedAt)
        throw new Error('returnToken not implemented currect')

    const token =  jwt.sign({
        email:email, 
        createdAt:createdAt,
        updatedAt: updatedAt
    }, process.env.TOKEN_SECRET,{
        expiresIn: TOKEN_EXPIRY,
        algorithm: 'HS256'
    });
    return token;
}


exports.getToken = getToken;

const jwt = require('jsonwebtoken');
const TOKEN_EXPIRY = 3600000;

const getToken = function(email, createdAt,updatedAt,image){

    if(!email || !createdAt)
        throw new Error('returnToken not implemented currect')

    const token =  jwt.sign({
        email:email, 
        createdAt:createdAt,
        updatedAt: updatedAt,
        image: image
    }, process.env.TOKEN_SECRET,{
        expiresIn: TOKEN_EXPIRY,
        algorithm: 'HS256'
    });
    return token;
}


exports.getToken = getToken;

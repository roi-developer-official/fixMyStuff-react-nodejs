
const throwError = function(message,code,next){
    const error = new Error();
    error.code = code;
    error.message = message;
    return next(error);
}

exports.throwError =  throwError;


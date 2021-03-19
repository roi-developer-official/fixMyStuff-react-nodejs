

const throwError = function(message,code,next){
    const error = new Error();
    error.code = code;
    error.message = message;
    return next(error);
}

const validateInputs = function(errors,next){
    if(!errors.isEmpty()){
        let message = '';
        for(let i of errors.array()){
            message += i.param + ':' + i.msg + ', '
        }
        console.log(message);
        return message;
    }
    return null;
}



exports.throwError =  throwError;
exports.validateInputs = validateInputs;


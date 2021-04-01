

export const validation = (validationParams,input,compareString = null)=>{
    for(let key of Object.keys(validationParams)){
        if(key === 'required' && validationParams[key]){
            if(input.trim().length === 0){
                return 'this field is required'
            };
        }
        if(key === 'minLength'){
            if(input.length < validationParams[key]){
                return `this field must be at least ${validationParams[key]} chracters`
            }
        }
        if(key === 'password'){
            if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input))){
                return 'password must contain upper and lower case character and numbers'
            }
        }
        if(key === 'alphaNumeric'){
           if(!(/^[a-zA-Z0-9_]*$/.test(input))){
                return 'this field cannot contain symbolic characters'
           }
        }
        if(key === 'numeric'){
            if(!(/^[0-9]*$/.test(input))){
                return 'this field cannot contain characters'
           }
        }
        if(key === 'compareTo'){
            if(input !== compareString){
                return "passwords do not match";
            }
        }
        if(key === 'email'){
            if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.trim()))){
                return 'please enter a valid email'
            }
        }
    }
    return null;
}


/**
 *@function returnFormDataSignIn
 * @param {object} inputs - containing inputs in on object form
 * @returns {FormData} - formData to be submmited
 */
export function returnFormDataSignIn(inputs) {
    let reqData = new FormData();
    for(let key in inputs){
        for(let input of inputs[key]){
            reqData.append(input.name, input.value)
        }
    }
    return reqData;
}

/**
 *@function returnFormDataLogin
 * @param {object} inputs - containing inputs in on object form
 * @returns {FormData} - formData to be submmited
 */
export function returnFormDataLogin(inputs) {
    let reqData = new FormData();
    for(let input of inputs){
        reqData.append(input.name, input.value)
    }
    return reqData;
}

/**
 * @function extractErrorMessage - return error message from the server or default when server is off
 * @param {Error} error - error from http request
 * @returns {string} - error message 
 */
export function extractErrorMessage(error){
    if (error.response && error.response.data && error.response.data.error){
        return error.response.data.error.message;
    }
    else return "500 Connection Refuse"
}
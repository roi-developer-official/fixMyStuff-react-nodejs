
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
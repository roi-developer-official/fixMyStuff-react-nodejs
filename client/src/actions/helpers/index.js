/**
 * @function returnFormData
 * @param {object} inputs - containing inputs in on object form
 * @returns {FormData} - formData to be submmited
 */
export function returnFormData(inputs, rest) {
  let reqData = new FormData();
  if (Array.isArray(inputs)) {
    for (let input of inputs) {
      reqData.append(input.name, input.value);
    }
  } else {
    for (let key in inputs) {
      if (inputs[key].length > 0) {
        for (let input of inputs[key]) {
          reqData.append(input.name, input.value);
        }
      }
    }
  }
  if (rest && rest.size > 0) {
    rest.forEach((val, key) => reqData.append(key, val));
  }

  return reqData;
}

/**
 * @function extractErrorMessage - return error message from the server or default when server is off
 * @param {Error} error - error from http request
 * @returns {string} - error message
 */
export function extractErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error.message;
  } else return "500 Connection Refuse";
}


export function generateNewPostFromInputs(inputs){
  let post = {};  

  for(let {key,value } of Object.keys(inputs)){
    console.log(key, value);
  }

}
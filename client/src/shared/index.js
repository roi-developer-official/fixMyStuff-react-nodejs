/**
 * @function addToRefsArray - gets an array and adds html element to the current array
 * @param {HTMLElement} el - the element to be addded the the reference array.
 * @param {*} refs - reference array
 */
export function addToRefsArray(el, refs) {
  if (el && !refs.current.includes(el)) refs.current.push(el);
}

/**
 * @function validation
 * @param {object} validationParams - contains the validation properties to check
 * @param {string} input - value of the input field
 * @param {string} compareString - in case of comparing values this is the compareWith value
 * @returns {string|null} - the error message or null
 */
export const validation = (validationParams, input, compareString = null) => {
  for (let key of Object.keys(validationParams)) {
    if (key === "checked" && !input) {
      return "this field is must be checked";
    }
    if (key === "required" && validationParams[key]) {
      if (input.trim().length === 0) {
        return "this field is required";
      }
    }
    if (key === "minLength") {
      if (input.length < validationParams[key]) {
        return `this field must be at least ${validationParams[key]} chracters`;
      }
    }
    if (key === "password") {
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input)
      ) {
        return "password must contain upper and lower case character and numbers";
      }
    }
    if (key === "alphaNumeric") {
      if (!/^[a-zA-Z0-9_]*$/.test(input)) {
        return "this field cannot contain symbolic characters";
      }
    }
    if (key === "numeric") {
      if (!/^[0-9]*$/.test(input)) {
        return "this field cannot contain characters";
      }
    }
    if (key === "compareTo") {
      if (input !== compareString) {
        return "passwords do not match";
      }
    }
    if (key === "email") {
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          input.trim()
        )
      ) {
        return "please enter a valid email";
      }
    }
  }
  return null;
};

/**
 * @function isUserAuthenticated
 * @param {object} user - the current user in the redux store
 * @returns {boolean} - true if auth and false if not
 */
export function isUserAuthenticated(user) {
  return Object.keys(user).length > 0;
}

/**
 * @function capitelizeFirstLetter
 * @param {string} string - the given string
 * @returns {string} - with the first letter capitelize
 */

export function capitelizeFirstLetter(string) {
  if (string === undefined) {
    return " ";
  }
  return string
    .charAt(0)
    .toUpperCase()
    .concat(string.substring(1, string.length));
}

export function spaceBetweenLetters(string) {
  if (string === undefined) {
    return "";
  }
  let newStr = string.charAt(0).toUpperCase();
  for (let i = 1; i < string.length; i++) {
    if (string[i] >= "A" && string[i] <= "Z") {
      newStr += " ";
      newStr += string[i].toLowerCase();
    } else {
      newStr += string[i];
    }
  }

  return newStr;
}

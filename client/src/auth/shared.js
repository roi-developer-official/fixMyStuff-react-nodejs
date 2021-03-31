import { FormFeedback } from "../Global_UI/formFeedback";

/**
 * @function returnCustomFeedback - return custom message for success/failing page submit
 * @param {string} error - represente an error on the page
 * @param {string} message - represente an success page submitt
 * @param {boolean} success - true when page successeded and false otherwise
 * @returns {JSX} - feedback element and null if action diesnt started/finished
 */
export function returnCustomFeedback(error, message, success) {
  if (error) {
    return <FormFeedback error={true} message={message}></FormFeedback>;
  } else if (success) {
    return <FormFeedback error={false} message={message}></FormFeedback>;
  } else {
    return null;
  }
}

/**
 *@function returnFormData
 * @param {Map} inputs - containing inputs in key value pair
 * @returns {FormData} - formData to be submmited
 */
export function returnFormData(inputs) {
  let reqData = new FormData();
  inputs.forEach((key, value) => {
    reqData.append(value, key);
  });
  return reqData;
}


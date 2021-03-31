/**
 *@function returnFormData
 * @param {Map} inputs - containing inputs in key value pair
 * @returns {FormData} - formData to be submmited
 */
export function returnFormData(inputs) {
  let reqData = new FormData();
  inputs.forEach((input) => {
    reqData.append(input.name, input.value);
  });
  return reqData;
}



/**
 * @function addToRefsArray - gets an array and adds html element to the current array
 * @param {HTMLElement} el - the element to be addded the the reference array.
 * @param {*} refs - reference array 
 */
export function addToRefsArray(el,refs){
    if(el && !refs.current.includes(el))
      refs.current.push(el);
  }
  
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


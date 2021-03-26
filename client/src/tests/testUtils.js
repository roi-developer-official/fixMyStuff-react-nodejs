/**
 * Return node with the given data-test attribute
 * @param {ShallowWrapper} wrapper 
 * @param {string} val 
 * @returns {ShallowWrapper}
 */
 export const findByAttr = (wrapper,val)=>{
    return wrapper.find(`[data-test='${val}']`);
}

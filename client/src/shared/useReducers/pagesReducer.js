
export const actionTypes = {
    SET_INPUT : "SET_INPUT"
}

/**
 * @function pagesReducer - reducer for pages with inpts fields than need's to be set
 * @param {object} state 
 * @param {object} action 
 * @returns 
 */
export function pagesReducer(state, action){
    const updatedInput = state.inputs.slice();
     const index = updatedInput.findIndex((input) => input.name === action.name);
     switch (action.type) {
       case actionTypes.SET_INPUT:
         updatedInput[index].value = action.value;
         updatedInput[index].error = action.error;
         return {
           ...state,
           inputs: updatedInput,
         };
       default: return state;
     }
}

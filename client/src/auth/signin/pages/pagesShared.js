export const SET_INPUT = "SET_INPUT";

export default function pagesReducer(state, action){
 const updatedInput = state.inputs.slice();
  const index = updatedInput.findIndex((input) => input.name === action.name);
  switch (action.type) {
    case SET_INPUT:
      updatedInput[index].value = action.value;
      updatedInput[index].error = action.error;
      return {
        ...state,
        inputs: updatedInput,
      };
    default: return state;
  }
}

export function addToRefsArray(el,refs){
  if(el && !refs.current.includes(el))
    refs.current.push(el);
}


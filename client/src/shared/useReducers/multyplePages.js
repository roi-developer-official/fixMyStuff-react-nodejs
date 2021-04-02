
export const actionTypes = {
    INCREMENT_STEP: "INCREMENT_STEP",
    DECREMENT_STEP: "DECREMENT_STEP",
    SET_INPUTS: "SET_INPUTS"
};

/**
 * @function multyPagesReducer - used for form pages with multiple pages and inputs
 * @param {object} state - the state of the component using this reducer
 * @param {object} action - holds type and data for the reduced action
 * @returns - new state
 */
export function multyPagesReducer(state, action) {
    switch (action.type) {
      case actionTypes.INCREMENT_STEP:
        return {
          ...state,
          currentStep: state.currentStep + 1,
        };
      case actionTypes.DECREMENT_STEP:
        return {
          ...state,
          currentStep: state.currentStep - 1,
        };
      case actionTypes.SET_INPUTS:
        const { inputs } = action.payload;
        let updatedInputs = state.inputs.slice();
        for (let input of inputs) {
          const index = updatedInputs.findIndex(
            (entry) => entry.name === input.name
          );
          updatedInputs[index].value = input.value;
        }
        return {
          ...state,
          inputs: updatedInputs,
        };
      default:
        return state;
    }
  }
import { actionTypes } from "../actions/authAction";

const initialState = {
  loading: false,
  error: null,
  user: null,
  expiry: null,
  success: false,
   inputs: [
    { name: "firstName", value: "", error: "" },
    { name: "lastName", value: "", error: "" },
    { name: "city", value: "", error: "" },
    { name: "role", value: 1, error : "" },
    { name: "profession", value: "", error: "" },
    { name: "experience", value: "", error: "" },
  ],
};

const authReducer = (state = initialState, action) => {
  
  switch(action.type){
    case actionTypes.SET_INPUT:
          const updatedInput = state.inputs.slice();
          const index = updatedInput.findIndex((input) => input.name === action.name);
         updatedInput[index].value = action.value;
         updatedInput[index].error = action.error;
         return {
           ...state,
           inputs: updatedInput,
         };
    case actionTypes.ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    case actionTypes.RESET_STATE: {
      return {
        ...state,
        error: null,
        loading: false,
        success: false,
      };
    }
    case actionTypes.ACTION_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.payload.user,
        expiry: action.payload.expiry,
        success: true
      };

    default:
      return state;
  }
};
export default authReducer;
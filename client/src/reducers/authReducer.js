import { actionTypes } from "../actions/authAction";

const initialState = {
  user: null,
  expiry: null,
  loading: false,
  error: null,
  success: false,
  signInInputs: {
    page1: [
      { name: "firstName", value: "", error: "" },
      { name: "lastName", value: "", error: "" },
      { name: "city", value: "", error: "" },
    ],
    page3: [
      { name: "role", value: 1, error: "" },
      { name: "profession", value: "", error: "" },
      { name: "experience", value: "", error: "" },
    ],
    page4: [
      { name: "email", value: "", error: "" },
      { name: "password", value: "", error: "" },
      { name: "confirmPassword", value: "", error: "" },
    ],
  },
  currentStep: 1
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_SET_INPUT:
      const updatedInput = [...state.signInInputs[action.page]];
      const index = updatedInput.findIndex(
        (input) => input.name === action.name
      );
      updatedInput[index].value = action.value;
      updatedInput[index].error = action.error;
      return {
        ...state,
        signInInputs: { ...state.signInInputs, [action.page] : updatedInput },
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
        success: false,
      };
    case actionTypes.RESET_STATE: {
      return {
        ...state,
        error: null,
        loading: false,
        success: false,
        currentStep:1,
        signInInputs:{
          page1: [
            { name: "firstName", value: "", error: "" },
            { name: "lastName", value: "", error: "" },
            { name: "city", value: "", error: "" },
          ],
          page3: [
            { name: "role", value: 1, error: "" },
            { name: "profession", value: "", error: "" },
            { name: "experience", value: "", error: "" },
          ],
          page4: [
            { name: "email", value: "", error: "" },
            { name: "password", value: "", error: "" },
            { name: "confirmPassword", value: "", error: "" },
          ],
        },
      };
    }
    case actionTypes.ACTION_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.payload.user,
        expiry: action.payload.expiry,
        success: true,
      };
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
    default:
      return state;
  }
};
export default authReducer;

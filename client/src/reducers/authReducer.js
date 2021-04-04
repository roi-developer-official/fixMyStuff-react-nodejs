import { actionTypes } from "../actions/authAction";

const initialState = {
  user: {},
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
    page2: [
      {name : "image", value : ""}
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
      { name: "terms", value: "", error: "" },
    ],
  },
  loginInputs: [
    { name: "email", value: "", error: "" },
    { name: "password", value: "", error: "" },
  ],
  currentStep: 1,
};

const authReducer = (state = initialState, action) => {
  let updatedInput;
  let index;
  switch (action.type) {
    case actionTypes.AUTH_SIGN_SET_INPUT:
      updatedInput = [...state.signInInputs[action.page]];
      index = updatedInput.findIndex((input) => input.name === action.name);
      updatedInput[index].value = action.value;
      updatedInput[index].error = action.error;
      return {
        ...state,
        signInInputs: { ...state.signInInputs, [action.page]: updatedInput },
      };
    case actionTypes.AUTH_LOGIN_SET_INPUT:
      updatedInput = state.loginInputs.slice();
      index = updatedInput.findIndex((input) => input.name === action.name);
      updatedInput[index].value = action.value;
      updatedInput[index].error = action.error;
      return {
        ...state,
        loginInputs: updatedInput,
      };
    case actionTypes.AUTH_LOGOUT:
      return initialState;
    case actionTypes.AUTH_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
        success:false
      };
    case actionTypes.AUTH_RESET_STATE:
      return {
        ...state,
        loading: false,
        error: null,
        success:false,
        currentStep:1,
        signInInputs: initialState.signInInputs,
        loginInputs: initialState.loginInputs
      };
    case actionTypes.AUTH_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case actionTypes.AUTH_ACTION_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.payload.user,
        expiry: action.payload.expiry,
        success: true,
      };
    case actionTypes.AUTH_INCREMENT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case actionTypes.AUTH_DECREMENT_STEP:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    default:
      return state;
  }
};
export default authReducer;

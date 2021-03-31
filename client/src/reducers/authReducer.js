import { actionTypes } from "../actions/authAction";

const initialState = {
  loading: false,
  error: null,
  user: null,
  expiry: null,
  success: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
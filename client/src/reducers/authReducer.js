import { actionTypes } from "../actions/authAction";

const initialState = {
  loading: false,
  error: null,
  user: null,
  expiry: null,
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
      };
    case actionTypes.RESET_STATE: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }
    case actionTypes.ACTION_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.payload.user,
        expiry: action.payload.expiry,
      };
    default:
      return state;
  }
};
export default authReducer;
import {actionTypes} from '../actions/postAction';
const initialState = {
  posts: [],
  loading: false,
  success: false,
  error: null,
  currentPage: 1,
  addPostInput: [
    { name: "title", value: "", error: "" },
    { name: "maxPayment", value: "", error: "" },
    { name: "description", value: "", error: "" },
    { name: "image", value: "" },
  ],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.POST_INCREMENT_STEP: 
        return {
            ...state,
            currentPage :state.currentPage + 1
        };
      case actionTypes.POST_DECREMENT_STEP: 
        return {
            ...state,
            currentPage :state.currentPage - 1
        };
    case actionTypes.ADD_POST_SET_INPUT:
        const updatedInput = state.addPostInput.slice();
        const index = updatedInput.findIndex((input)=>input.name === action.name);
        updatedInput[index].value = action.value;
        updatedInput[index].error = action.error;
        return {
            ...state,
            addPostInput : updatedInput
        }
    case actionTypes.POST_RESET_STATE:
        return {
            ...state,
            currentPage: 1,
            addPostInput :initialState.addPostInput,
            error: null,
            loading:false,
            success: false
        };
    case actionTypes.POST_ACTION_START:
        return {
            ...state,
            loading: true,
            error: null,
        }
    default:
      return state;
  }
};

export default postReducer;

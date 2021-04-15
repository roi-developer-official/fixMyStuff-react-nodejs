import {actionTypes} from '../actions/postAction';
const initialState = {
  posts: [],
  post: null,
  loading: false,
  success: false,
  error: null,
  currentPage: 1,
  addPostInputs: {
    page1: [
      { name: "title", value: "", error: "" },
      { name: "maxPayment", value: "", error: "" },
      { name: "description", value: "", error: "" }
    ],
    page2 : [
      { name: "image", value: ""},
    ]
  },
};

const postReducer = (state = initialState, action) => {
  
  let index;
  let updatedInput;
  switch (action.type) {
        case actionTypes.POST_ADD_SET_INPUT:
          updatedInput = [...state.addPostInputs[action.page]];
          index = updatedInput.findIndex((input) => input.name === action.name);
          updatedInput[index].value = action.value;
          updatedInput[index].error = action.error;
          return {
            ...state,
            addPostInputs: { ...state.addPostInputs, [action.page]: updatedInput },
          };
    case actionTypes.POST_RESET_STATE:
        return {
          ...state,
          error:null,
          success:false
        };
    case actionTypes.POST_ACTION_START:
        return {
            ...state,
            loading: true,
            error: null,
        }
      case actionTypes.POST_ADD_FAIL:
        return {
          ...state,
          loading:false,
          error: action.payload
        }
      case actionTypes.POST_ADD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          posts: state.posts.concat([action.payload]),
          success:true
        }
      case actionTypes.POST_GET_POSTS_SUCESS:
        return {
          ...state,
          error:null,
          loading:false,
          posts: action.payload,
        }
    default:
      return state;
  }
};

export default postReducer;

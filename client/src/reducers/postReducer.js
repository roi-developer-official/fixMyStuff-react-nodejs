import { actionTypes } from "../actions/postAction";
const initialState = {
  posts: [],
  deletedPosts: [],
  post: null,
  loading: false,
  success: false,
  addPostError: null,
  getPostsError: null,
  deletePostsError: null,
  currentPage: 1,
  addPostInputs: {
    page1: [
      { name: "title", value: "", error: "" },
      { name: "maxPayment", value: "", error: "" },
      { name: "description", value: "", error: "" },
    ],
    page2: [{ name: "image", value: "" }],
  },
  page: 1,
  order: "updatedAt",
  count: 0
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
        addPostError: null,
        deletePostsError: null,
        getPostsError: null,
        success: false,
        deletedPosts: [],
      };
    case actionTypes.POST_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.POST_ADD_FAIL:
      return {
        ...state,
        loading: false,
        addPostError: action.payload,
      };
    case actionTypes.POST_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.concat([action.payload]),
        success: true,
      };
    case actionTypes.POST_GET_POSTS_SUCESS:
      return {
        ...state,
        getPostsError: null,
        loading: false,
        posts: action.payload.posts,
        count: action.payload.count
      };
    case actionTypes.POST_GET_POSTS_FAIL:
      return {
        ...state,
        getPostsError: action.payload,
      };
    case actionTypes.POST_ADD_DELETE_POST:
      return {
        ...state,
        deletedPosts: state.deletedPosts.concat([action.payload]),
      };
    case actionTypes.POST_REMOVE_DELETE_POST:
      let updatedDeletedPosts = state.deletedPosts
        .slice()
        .filter((id) => id !== action.payload);
      return {
        ...state,
        deletedPosts: updatedDeletedPosts,
      };
    case actionTypes.POST_CHANGE_PAGE:
      return {
        ...state,
        page : action.payload
      };
    case actionTypes.POST_SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case actionTypes.POST_DELETE_POSTS_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        posts: action.payload.posts,
        page: action.payload.page,
        loading:false,
        deletePostsError:null,
        success:true
      }
    default:
      return state;
  }
};

export default postReducer;

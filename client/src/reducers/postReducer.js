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
      {
        value: "",
        error: "",
        label: "What happend? (few words)",
        type: "text",
        name: "title",
        validations: {
          required: true,
        },
      },
      {
        label: "wow much you willing to pay for it",
        type: "number",
        name: "maxPayment",
        error: "",
        value: 0,
        min: 0,
        className: "addpost_number_input",
        validations: {
          numeric: true,
          min: 0,
        },
      },
      {
        label: "Add detailed description",
        name: "description",
        cols: 30,
        rows: 5,
        value: "",
        error: "",
      },
    ],
    page2: [{ name: "image", value: "" }],
  },
  page: 1,
  order: "updatedAt",
  count: 0,
};

const postReducer = (state = initialState, action) => {
  let index;
  let updatedInputs;
  let mergedInputs;
  let newInput;
  switch (action.type) {
    case actionTypes.POST_ADD_SET_INPUT:
      updatedInputs = JSON.parse(JSON.stringify(state.addPostInputs));
      mergedInputs = updatedInputs.page1.concat(updatedInputs.page2);
      newInput = mergedInputs.find((input) => input.name === action.name);
      newInput.value = action.value;
      newInput.error = action.error;
      return {
        ...state,
        addPostInputs: updatedInputs,
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
        count: action.payload.count,
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
        page: action.payload,
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
        loading: false,
        deletePostsError: null,
        success: true,
      };
    case actionTypes.POST_SET_SINGLE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case actionTypes.POST_SET_INPUTS:
      updatedInputs = JSON.parse(JSON.stringify(state.addPostInputs));
      mergedInputs = updatedInputs.page1.concat(updatedInputs.page2);
      for (const [key, value] of Object.entries(action.payload)) {
        newInput = mergedInputs.find((input) => input.name === key);
        if(newInput){
          newInput.value = value;
       }
      }
      return {
        ...state,
        addPostInputs: updatedInputs,
      };
    default:
      return state;
  }
};

export default postReducer;

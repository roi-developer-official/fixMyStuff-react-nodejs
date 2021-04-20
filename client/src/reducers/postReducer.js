import { actionTypes } from "../actions/postAction";
const initialState = {
  posts: [],
  deletedPosts: [],
  post: null,
  loading: false,
  success: false,
  singlePostError: null,
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
        singlePostError: null,
        deletePostsError: null,
        getPostsError: null,
        success: false,
        deletedPosts: [],
        addPostInputs : initialState.addPostInputs
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
        singlePostError: action.payload,
      };
    case actionTypes.POST_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        singlePostError: null,
        posts: state.posts.concat([action.payload.post]),
        success: action.payload.message,
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
        success: action.payload.message,
      };
    case actionTypes.POST_SET_SINGLE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case actionTypes.POST_SET_INPUTS:
      updatedInputs = JSON.parse(JSON.stringify(state.addPostInputs));
      mergedInputs = updatedInputs.page1.concat(updatedInputs.page2);
      for (let [key, value] of Object.entries(action.payload)) {
        value = value === "null" ? null : value;
        newInput = mergedInputs.find((input) => input.name === key);

        if (newInput) {
          newInput.value = value;
        }
      }
      return {
        ...state,
        addPostInputs: updatedInputs,
      };
    case actionTypes.POST_EDIT_POST_SUCCESS:
      let updatadPosts = JSON.parse(JSON.stringify(state.posts));
      let index = updatadPosts.findIndex((post) => post.id === action.payload.post.id);
      updatadPosts[index] = action.payload.post;
      return {
        ...state,
        success: action.payload.message,
        posts: updatadPosts,
        loading: false,
        singlePostError: null,
      };
    case actionTypes.POST_EDIT_POST_FAIL:
      return {
        ...state,
        singlePostError: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;

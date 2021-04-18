import axios from "axios";
import { extractErrorMessage, returnFormData } from "./helpers";
export const actionTypes = {
  POST_ACTION_START: "POST_ACTION_START",
  POST_ADD_FAIL: "POST_ADD_FAIL",
  POST_ADD_SUCCESS: "POST_ADD_SUCCESS",
  POST_RESET_STATE: "POST_RESET_STATE",
  POST_ADD_SET_INPUT: "POST_ADD_SET_INPUT",
  POST_GET_POSTS: "POST_GET_POSTS",
  POST_GET_POSTS_SUCESS: "POST_GET_POSTS_SUCESS",
  POST_GET_POSTS_FAIL: "POST_GET_POSTS_FAIL",
  POST_DELETE_POSTS: "POST_DELETE_POSTS",
  POST_ADD_DELETE_POST: "POST_ADD_DELETE_POST",
  POST_REMOVE_DELETE_POST: "POST_REMOVE_DELETE_POST",
  POST_DELETE_POSTS_SUCCESS: "POST_DELETE_POSTS_SUCCESS",
  POST_CHANGE_PAGE: "POST_CHANGE_PAGE",
  POST_SET_ORDER: "POST_SET_ORDER",
  POST_DELETE_POSTS_FAIL: "POST_DELETE_POSTS_FAIL",
  POST_SET_SINGLE_POST: "POST_SET_SINGLE_POST",
  POST_SET_INPUTS: "POST_SET_INPUTS",
  POST_GET_SINGLE_FAIL: "POST_GET_SINGLE_FAIL",
};

/**
 * @function addPost Redux thunk action creator for addPost request
 * @param {string} email - the email of the user
 * @returns
 */
export const addPost = () => (dispatch, getState) => {
  const inputs = getState().postReducer.addPostInputs;
  const reqData = returnFormData(inputs);
  axios
    .post("/api/user/create-post", reqData)
    .then((res) => {
      dispatch({ type: actionTypes.POST_ADD_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      const message = extractErrorMessage(error);
      dispatch({ type: actionTypes.POST_ADD_FAIL, payload: message });
    });
};
/**
 * @function getPosts
 * @returns {array} - posts array
 */
export const getPosts = () => (dispatch, getState) => {
  const { page, order } = getState().postReducer;
  axios
    .get(`/api/user/posts?&page=${page}&order=${order}`)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_GET_POSTS_SUCESS,
        payload: {
          posts: res.data.result.posts,
          count: res.data.result.count,
        },
      });
    })
    .catch((error) => {
      const message = extractErrorMessage(error);
      dispatch({ type: actionTypes.POST_GET_POSTS_FAIL, payload: message });
    });
};

/**
 * @function deletePosts - delete multyple posts
 * @returns
 */
export const deletePosts = () => (dispatch, getState) => {
  let { deletedPosts, page, order } = getState().postReducer;

  let reqData;
  if (deletedPosts.length > 0) {
    reqData = {
      deleted: deletedPosts,
      order,
      page,
    };
    axios
      .post("/api/user/delete-posts", reqData)
      .then((res) => {
        const { count, posts, page } = res.data.results;
        dispatch({
          type: actionTypes.POST_DELETE_POSTS_SUCCESS,
          payload: { count, posts, page },
        });
      })
      .catch((error) =>
        dispatch({
          type: actionTypes.POST_DELETE_POSTS_FAIL,
          payload: extractErrorMessage(error),
        })
      );
  } else {
    return;
  }
};

export const getSinglePost = (id) => (dispatch) => {
  axios
    .get(`/api/user/single-post/${id}`)
    .then((res) => {
      dispatch({ type: actionTypes.POST_SET_INPUTS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.POST_GET_POSTS_FAIL,
        error: extractErrorMessage(error),
      });
    });
};

export const editPost = (id) => (dispatch, getState) => {
  
  const inputs = getState().postReducer.addPostInputs;
  const reqData = returnFormData(inputs);
  axios
    .post(`/api/user/edit-post/${id}`, reqData)
    .then((res) => {})
    .catch((error) => {});
};

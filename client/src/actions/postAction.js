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
  POST_INCREMENT_PAGE: "POST_INCREMENT_PAGE",
  POST_DECREMENT_PAGE: "POST_INCREMENT_PAGE",
  POST_SET_ORDER: "POST_SET_ORDER",
  POST_DELETE_POSTS_FAIL: "POST_DELETE_POSTS_FAIL",
};

/**
 * @function addPost Redux thunk action creator for addPost request
 * @param {object} reqData
 * @param {function} callBack
 * @returns
 */
export const addPost = (email) => (dispatch, getState) => {
  const inputs = getState().postReducer.addPostInputs;
  const rest = new Map();
  rest.set("email", email);
  const reqData = returnFormData(inputs, rest);
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
 * @param {string} email - user email
 * @param {number} page - the page number to be fetched
 * @param {string} order - order on which to fetch.
 * @returns {array} - posts array
 */
export const getPosts = () => (dispatch, getState) => {
  const { page, order } = getState().postReducer;
  axios
    .get(`/api/user/posts?&page=${page}&order=${order}`)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_GET_POSTS_SUCESS,
        payload: res.data.result.posts,
      });
    })
    .catch((error) => {
      const message = extractErrorMessage(error);
      dispatch({ type: actionTypes.POST_GET_POSTS_FAIL, payload: message });
    });
};

/**
 * @function deletePosts - delete multyple posts
 * @param {string} email - the email of the user
 * @returns
 */
export const deletePosts = () => (dispatch, getState) => {
  let deleted = getState().postReducer.deletedPosts;
  let reqData;
  if (deleted.length > 0) {
    reqData = {
      deleted,
    };

    axios
      .post("/api/user/delete-posts", reqData)
      .then(() => dispatch(getPosts()))
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

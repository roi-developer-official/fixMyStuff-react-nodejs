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

export const getPosts = (email, page) => (dispatch) => {
  axios
    .get(`/api/user/posts?&email=${email}&page=${page}`)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_GET_POSTS_SUCESS,
        payload: res.data.result.posts,
      });
    })
    .catch((error) => {
      const message = extractErrorMessage(error);
      dispatch({ type: actionTypes.POST_ADD_FAIL, payload: message });
    });
};

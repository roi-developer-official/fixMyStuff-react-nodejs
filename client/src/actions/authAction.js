import axios from "axios";
export const actionTypes = {
  ACTION_START: "ACTION_START",
  ACTION_FAIL: "ACTION_FAIL",
  ACTION_SUCCESS: "ACTION_SUCCESS",
  RESET_STATE: "RESET_STATE",
};

/**
 * @function signIn Redux thunk action creator for signin request
 * @param {object} reqData
 * @returns {dispatch} - dispating action in case of success or faliure
 */
export const signIn = (reqData) => (dispatch) =>
  axios
    .post("api/auth/signup", reqData)
    .then((res) =>
      dispatch({
        type: actionTypes.ACTION_SUCCESS,
        payload: {
          user: res.data.user,
          expiry: res.data.expiry,
        },
      })
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.ACTION_FAIL,
        payload: error.response.data.error.message,
      })
    );

/**
 * @function login Redux thunk action creator for login request
 * @param {object} reqData - date to be sent to the server
 * @returns {dispatch} - dispating action in case of success or faliure
 */
export const login = (reqData) => (dispatch) =>
  axios
    .post("api/auth/login", reqData)
    .then((res) =>
      dispatch({
        type: actionTypes.ACTION_SUCCESS,
        payload: {
          user: res.data.user,
          expiry: res.data.expiry,
        },
      })
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.ACTION_FAIL,
        payload: error.response.data.error.message,
      })
    );

/**
 * @function logOut 
 * @returns {dispatch} - dispatch in case of user returned from the server
 */
export const logOut = () => (dispatch) =>
  axios
    .post("/api/auth/logout")
    .then(() =>
      dispatch({
        type: actionTypes.ACTION_SUCCESS,
        payload: {
          user:null,
          expiry: null
        },
      })
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.ACTION_FAIL,
        payload: error.response.data.error.message,
      })
    );
/**
 * @function AuthOnRefresh - called on page refresh
 * @returns {dispatch} - dispatch in case of user returned from the server
 */
export const AuthOnRefresh = () => (dispatch) =>
  axios.get("/api/auth/refresh").then((res) => {
    if (res.data.user) {
      dispatch({
        type: actionTypes.ACTION_SUCCESS,
        payload: {
          user: res.data.user,
          expiry: res.data.expiry,
        },
      });
    }
  });

import axios from "axios";
import { returnFormDataSignIn, returnFormDataLogin } from "./helpers";

export const actionTypes = {
  AUTH_ACTION_START: "AUTH_ACTION_START",
  AUTH_ACTION_FAIL: "AUTH_ACTION_FAIL",
  AUTH_ACTION_SUCCESS: "AUTH_ACTION_SUCCESS",
  AUTH_RESET_STATE: "AUTH_RESET_STATE",
  AUTH_SIGN_SET_INPUT : "AUTH_SIGN_SET_INPUT",
  AUTH_INCREMENT_STEP: "AUTH_INCREMENT_STEP",
  AUTH_DECREMENT_STEP: "AUTH_DECREMENT_STEP",
  AUTH_LOGIN_SET_INPUT : "AUTH_LOGIN_SET_INPUT"
};

/**
 * @function signIn Redux thunk action creator for signin request
 * @param {object} reqData
 * @returns {dispatch} - dispating action in case of success or faliure
 */
export const signIn = () => (dispatch,getState) =>{
  const inputs = getState().authReducer.signInInputs;
  const reqData = returnFormDataSignIn(inputs);
  return axios
  .post("api/auth/signup", reqData)
  .then((res) =>
    dispatch({
      type: actionTypes.AUTH_ACTION_SUCCESS,
      payload: {
        user: res.data.user,
        expiry: res.data.expiry,
      },
    })
  )
  .catch((error) =>
    dispatch({
      type: actionTypes.AUTH_ACTION_FAIL,
      payload: error.response.data.error.message,
    })
  );
}
/**
 * @function login Redux thunk action creator for login request
 * @param {object} reqData - date to be sent to the server
 * @returns {dispatch} - dispating action in case of success or faliure
 */
export const login = () => (dispatch,getState) =>{
  const inputs = getState().authReducer.loginInputs;
  let reqData = returnFormDataLogin(inputs)
  return axios
  .post("api/auth/login", reqData)
  .then((res) =>
    dispatch({
      type: actionTypes.AUTH_ACTION_SUCCESS,
      payload: {
        user: res.data.user,
        expiry: res.data.expiry,
      },
    })
  )
  .catch((error) =>
    dispatch({
      type: actionTypes.AUTH_ACTION_FAIL,
      payload: error.response.data.error.message,
    })
  );
}
  

/**
 * @function logOut 
 * @returns {dispatch} - dispatch in case of user returned from the server
 */
export const logOut = () => (dispatch) =>
  axios
    .post("/api/auth/logout")
    .then(() =>
      dispatch({
        type: actionTypes.AUTH_ACTION_SUCCESS,
        payload: {
          user:null,
          expiry: null
        },
      })
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.AUTH_ACTION_FAIL,
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
        type: actionTypes.AUTH_ACTION_SUCCESS,
        payload: {
          user: res.data.user,
          expiry: res.data.expiry,
        },
      });
    }
  });

  /**
   * @function RequestCsrfToken - attaches csrf token to every following request
   */
  export const requestCsrfToken = () => 
    axios.get('/api/initv').then((res)=>{
      const csrfToken = res.data.csrfToken;
      axios.defaults.headers["x-csrf-token"] = csrfToken
  });
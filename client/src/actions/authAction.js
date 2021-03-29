import { Axios } from "../util/axios";

export const actionTypes = {
  ACTION_START: "ACTION_START",
  ACTION_SUCCESS: "ACTION_SUCCESS",
  ACTION_FAIL: "ACTION_FAIL",
  RESET_STATE: "RESET_STATE"
};

/**
 * @function signIn Redux thunk action creator for signin request
 * @param {object} reqData
 * @param {function} callBack
 */
export const signIn = (reqData, callBack) => {
  return (dispatch) => {
    Axios.post("auth/signup", reqData)
      .then((res) => {
        dispatch(actionSuccess());
        callBack(res.data);
      })
      .catch((error) => {
        const message = error.response.data.error.message;
        dispatch(actionFailed(message));
      });
  };
};

/**
 * @function login Redux thunk action creator for login request
 * @param {object} reqData
 * @param {function} callBack
 */
export const login = (reqData, callback) => {
  return (dispatch) => {
    Axios.post("auth/login", reqData)
      .then((res) => {
        dispatch(actionSuccess());

        callback(res.data);
      })
      .catch((error) => {
        const message = error.response.data.error.message;
        dispatch(actionFailed(message));
      });
  };
};


/**
 * @function actionFailed Redux thunk action creator for handeling global failing actions
 * @param {string} error 
 * @returns {onject} with type ACTION_FAIL
 */
export const actionFailed = (error)=>{
  return {
      type: actionTypes.ACTION_FAIL,
      payload: error
  }
}

/**
 * @function actionSuccess Redux thunk action creator for handeling global success actions
 * @returns {object} with type ACTION_SUCCESS
 */
export const actionSuccess = () =>{
  return {
      type: actionTypes.ACTION_SUCCESS
  }
}
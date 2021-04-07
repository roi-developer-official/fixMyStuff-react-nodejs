import axios from 'axios'
import { extractErrorMessage } from './helpers';
export const actionTypes = {
    POST_ACTION_START: "POST_ACTION_START",
    POST_ADD_FAIL: "POST_ADD_FAIL",
    POST_ADD_SUCCESS: "POST_ADD_SUCCESS",
    POST_RESET_STATE  : "POST_RESET_STATE",
    POST_ADD_SET_INPUT: "POST_ADD_SET_INPUT",
    POST_INCREMENT_STEP : "POST_INCREMENT_STEP",
    POST_DECREMENT_STEP : "POST_DECREMENT_STEP",
  };

/**
 * @function addPost Redux thunk action creator for addPost request
 * @param {object} reqData 
 * @param {function} callBack 
 * @returns 
 */
export const addPost = (reqData,callBack)=>{
    return dispatch =>{
        axios.post('user/create-post', reqData)
        .then(res=>{
            dispatch({type : actionTypes.POST_ADD_SUCCESS, payload: res.data.post})
            callBack();
        })
        .catch(error=>{
            console.log(error);
             const message = extractErrorMessage(error);
            dispatch({type : actionTypes.POST_ADD_FAIL, payload : message })
        })
    }
}



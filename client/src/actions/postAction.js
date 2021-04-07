import axios from 'axios'
import { extractErrorMessage, returnFormData} from './helpers';
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
export const addPost = (email)=>  (dispatch, getState) =>{
    const inputs = getState().postReducer.addPostInputs;
    const rest = new Map();
    rest.set("email", email);
    const reqData = returnFormData(inputs,rest);
        axios.post('/api/user/create-post', reqData)
        .then(res=>{
            dispatch({type : actionTypes.POST_ADD_SUCCESS, payload: res.data.post})
        })
        .catch(error=>{
            console.log(error);
             const message = extractErrorMessage(error);
            dispatch({type : actionTypes.POST_ADD_FAIL, payload : message })
        })
    }




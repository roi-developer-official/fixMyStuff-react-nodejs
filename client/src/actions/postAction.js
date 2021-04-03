import axios from 'axios';

export const actionTypes = {
    POST_ACTION_START: "POST_ACTION_START",
    POST_ACTION_FAIL: "POST_ACTION_FAIL",
    POST_ADD_SUCCESS: "POST_ADD_SUCCESS",
    POST_RESET_STATE  : "POST_RESET_STATE",
    ADD_POST_SET_INPUT: "ADD_POST_SET_INPUT",
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
        // axios.post('user/create-post', reqData)
        // .then(res=>{
        //     dispatch(actionSuccess())
        //     callBack();
        // })
        // .catch(error=>{
        //     console.log(error);
        //      const message = error.response.data.error.message;
        //     dispatch(actionFailed(message))
        // })
    }
}



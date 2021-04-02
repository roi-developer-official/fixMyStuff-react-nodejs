import axios from 'axios';

export const actionTypes = {
    ACTION_START: "ACTION_START",
    ACTION_FAIL: "ACTION_FAIL",
    ACTION_SUCCESS: "ACTION_SUCCESS"
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



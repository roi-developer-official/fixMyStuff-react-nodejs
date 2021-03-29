
import {Axios} from '../../../util/axios';
import {actionSuccess,actionFailed} from '../state.actions';

/**
 * @function addPost Redux thunk action creator for addPost request
 * @param {object} reqData 
 * @param {function} callBack 
 * @returns 
 */

export const addPost = (reqData,callBack)=>{
    return dispatch =>{
        Axios.post('user/create-post', reqData)
        .then(res=>{
            dispatch(actionSuccess())
            callBack();
        })
        .catch(error=>{
            console.log(error);
             const message = error.response.data.error.message;
            dispatch(actionFailed(message))
        })
    }
}



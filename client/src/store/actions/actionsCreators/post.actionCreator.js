import * as actions from '../state.actions';
import {Axios} from '../../../util/axios';
import {actionSuccess,actionFailed} from '../state.actions';




export const addPost = (reqData,callBack)=>{
    console.log(reqData);
    return dispatch =>{
        Axios.post('user/addpost', reqData)
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



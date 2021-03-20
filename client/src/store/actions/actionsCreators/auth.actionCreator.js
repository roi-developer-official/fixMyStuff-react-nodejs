import {Axios} from '../../../util/axios';
import {actionSuccess,actionFailed} from '../state.actions';

export const signIn = (reqData,callBack)=>{
    return dispatch =>{
        Axios.post('auth/signup', reqData)
        .then(res=>{
            dispatch(actionSuccess())
            callBack(res.data);
        })
        .catch(error=>{
            console.log(error);
             const message = error.response.data.error.message;
            dispatch(actionFailed(message))
        })

    }
}

export const login = (reqData,callback)=>{
    return dispatch=>{
        Axios.post('auth/login',reqData)
        .then(res=>{
            dispatch(actionSuccess());
            
            callback(res.data);
        })
        .catch(error=>{
            const message = error.response.data.error.message;
            dispatch(actionFailed(message))
        });
    }
}
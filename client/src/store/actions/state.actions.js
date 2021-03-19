
export const ACTION_START ='ACTION_START';
export const ACTION_SUCCESS = 'ACTION_SUCCESS';
export const ACTION_FAIL = 'ACTION_FAIL';
export const RESET_STATE = 'RESET_STATE';


export const actionFailed = (error)=>{
    return {
        type: ACTION_FAIL,
        payload: error
    }
}

export const actionSuccess = () =>{
    return {
        type: ACTION_SUCCESS
    }
}
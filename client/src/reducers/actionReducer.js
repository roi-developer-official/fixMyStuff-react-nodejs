const initialState = {
    error:null,
    loading:false
};

export const actionTypes = {
    ACTION_START: "ACTION_START",
    ACTION_SUCCESS: "ACTION_SUCCESS",
    ACTION_FAIL: "ACTION_FAIL",
    RESET_STATE: "RESET_STATE",
};

const actionReducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.ACTION_START:
            return{
                error:null,
                loading:true,
            }
        case actionTypes.ACTION_SUCCESS:
            return {
                error:null,
                loading:false
        }
        case actionTypes.ACTION_FAIL:
            return{
                error: action.payload,
                loading:false,
        }
        case actionTypes.RESET_STATE:
            return {
                error:null,
                loading:false
            }
        default: return state;
    }
};

export default actionReducer;

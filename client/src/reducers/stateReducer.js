import {actionTypes} from '../actions/authAction'
const initialState = {
    error:null,
    loading:false,
    user:null,
    token:null
};

const stateReducer = (state = initialState, action)=>{
   
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

export default stateReducer;

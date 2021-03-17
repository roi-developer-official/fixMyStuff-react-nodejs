import * as actions from '../actions/state.actions';

const initialState = {
    error:null,
    loading:false,
    user:null,
    token:null
};

const stateReducer = (state = initialState, action)=>{
   
    switch(action.type){
        case actions.ACTION_START:
            return{
                error:null,
                loading:true,
            }
        case actions.ACTION_SUCCESS:
            return {
                error:null,
                loading:false
        }
        case actions.ACTION_FAIL:
            return{
                error: action.payload,
                loading:false,
        }
        default: return state;
    }
};

export default stateReducer;

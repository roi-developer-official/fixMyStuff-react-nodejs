import * as actions from '../actions/post.actions';

const initialState = {
    posts: []
};

const postReducer = (state = initialState, action)=>{

    switch(action.type){

        default: return state;
    }
}

export default postReducer;
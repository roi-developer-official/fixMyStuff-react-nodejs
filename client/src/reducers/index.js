import { combineReducers } from 'redux';
import postReducer from './postReducer';
import stateReducer from './stateReducer';

export default combineReducers({
    postReducer,
    stateReducer
});
import { combineReducers } from 'redux';
import postReducer from './postReducer';
import actionReducer from './actionReducer';

export default combineReducers({
    postReducer,
    actionReducer
});
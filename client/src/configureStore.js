import { createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

export const middleWares = [ReduxThunk];

export default createStore(rootReducer,{}, applyMiddleware(...middleWares));
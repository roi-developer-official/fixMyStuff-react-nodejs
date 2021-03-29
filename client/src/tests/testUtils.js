import { createStore, applyMiddleware } from "redux";
import { middlewares } from "../configureStore";
import rootReducer from '../reducers';
/**
 * Return node with the given data-test attribute
 * @param {ShallowWrapper} wrapper
 * @param {string} val
 * @returns {ShallowWrapper}
 */
export const findByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 *  globals: rootReducer.
 * @param {object} initialState - Initial state for store.
 * @function storeFactory
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
};

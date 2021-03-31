import { storeFactory, user } from "../../../tests/testUtils";
import { actionTypes } from "../../authAction";

//testing for dipatching actions
test("action success return currect value", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.ACTION_SUCCESS,
    payload: { user , expiry: "2019" },
  });
  const newState = store.getState();
  expect(newState.authReducer).toStrictEqual({
    error: null,
    loading: false,
    user,
    expiry: "2019",
    success: true
  });
});

test("action fail return currect value", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.ACTION_FAIL,
    payload: "some error" 
  });
  const newState = store.getState();
  expect(newState.authReducer).toStrictEqual({
    loading: false,
    error: "some error",
    expiry: null,
    user: null,
    success: false
  });
});

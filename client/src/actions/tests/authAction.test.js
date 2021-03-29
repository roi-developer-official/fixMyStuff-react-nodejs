import { storeFactory } from "../../tests/testUtils";
import { actionSuccess, actionFailed } from "../authAction";


//  testing for dipatching actions
test("actions success return signup successfuly object", () => {
  const action = actionSuccess();
  expect(action).toStrictEqual({ type: "ACTION_SUCCESS" });
});

test("action success return currect value", () => {
  const store = storeFactory();
  store.dispatch(actionSuccess());
  const newState = store.getState();
  expect(newState.authReducer).toStrictEqual({ error: null, loading: false });
});

test("actions failed return signup failed object", () => {
  const action = actionFailed("some error");
  expect(action).toStrictEqual({ type: "ACTION_FAIL", payload: "some error" });
});

test("action fail should return currect value", () => {
  const store = storeFactory();
  store.dispatch(actionFailed("some error"));
  const newState = store.getState();
  expect(newState.authReducer).toStrictEqual({
    loading: false,
    error: "some error",
  });
});

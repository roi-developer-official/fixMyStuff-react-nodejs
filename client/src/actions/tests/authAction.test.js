import moxios from "moxios";
import { storeFactory } from "../../tests/testUtils";
import { actionSuccess, actionFailed, actionTypes } from "../authAction";

test("actions success return signup successfuly object", () => {
  const action = actionSuccess();
  expect(action).toStrictEqual({ type: "ACTION_SUCCESS" });
});

test("actions failed return signup failed object", () => {
  const action = actionFailed("error");
  expect(action).toStrictEqual({ type: "ACTION_FAIL", payload: "error" });
});

test('signup start', ()=>{
  let store = storeFactory();
  store.dispatch({ type: actionTypes.ACTION_START });
  expect(store.getState().authReducer).toMatchObject({ error: null, loading: true })
});



















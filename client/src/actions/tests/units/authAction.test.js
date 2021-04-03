import { storeFactory, user } from "../../../tests/testUtils";
import { actionTypes } from "../../authAction";

const initialState = {
  loading: false,
  error: null,
  user: null,
  expiry: null,
  success: false,
  signInInputs: {
    page1: [
      { name: "firstName", value: "", error: "" },
      { name: "lastName", value: "", error: "" },
      { name: "city", value: "", error: "" },
    ],
    page3: [
      { name: "role", value: 1, error: "" },
      { name: "profession", value: "", error: "" },
      { name: "experience", value: "", error: "" },
    ],
    page4: [
      { name: "email", value: "", error: "" },
      { name: "password", value: "", error: "" },
      { name: "confirmPassword", value: "", error: "" },
    ],
  },
  currentStep: 1,
  loginInputs: [
    { name: "email", value: "", error: "" },
    { name: "password", value: "", error: "" },
  ],
};

//testing for dipatching actions
test("action success return currect value", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.ACTION_SUCCESS,
    payload: { user, expiry: "2019" },
  });
  const newState = store.getState();
  expect(newState.authReducer).toStrictEqual({
    error: null,
    loading: false,
    user,
    expiry: "2019",
    success: true,
    signInInputs: initialState.signInInputs,
    currentStep:1,
    loginInputs : initialState.loginInputs
  });
});

test("action fail return currect value", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.ACTION_FAIL,
    payload: "some error",
  });
  const newState = store.getState();
  expect(newState.authReducer).toStrictEqual({
    loading: false,
    error: "some error",
    expiry: null,
    user: null,
    success: false,
    signInInputs: initialState.signInInputs,
    loginInputs : initialState.loginInputs,
    currentStep:1
  });
});

test("should set signin inputs", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.SIGN_SET_INPUT,
    name: "firstName",
    value: "abc",
    error: "some error",
    page: "page1"
  });
  const newState = store.getState();
  let expectedState = { ...initialState };
  expectedState.signInInputs.page1[0].value = "abc";
  expectedState.signInInputs.page1[0].error = "some error";
  expect(newState.authReducer).toEqual(expectedState);
});

test('should increment the step', ()=>{
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.INCREMENT_STEP});
  const newState = store.getState();
  expect(newState.authReducer).toEqual({...initialState, currentStep:2})
});

test('should decrement the step', ()=>{
  const store = storeFactory();
  store.dispatch({
   type: actionTypes.DECREMENT_STEP});
  const newState = store.getState();
  expect(newState.authReducer).toEqual({...initialState, currentStep:0})
});
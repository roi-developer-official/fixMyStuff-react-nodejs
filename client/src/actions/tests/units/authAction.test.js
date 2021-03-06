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
    page2: [{ name: "image", value: "" }],
    page3: [
      { name: "role", value: 1, error: "" },
      { name: "profession", value: "", error: "" },
      { name: "experience", value: "", error: "" },
    ],
    page4: [
      { name: "email", value: "", error: "" },
      { name: "password", value: "", error: "" },
      { name: "confirmPassword", value: "", error: "" },
      { name: "terms", value: "", error: "" },
    ],
  },
  currentStep: 1,
  loginInputs: [
    { name: "email", value: "", error: "" },
    { name: "password", value: "", error: "" },
  ],
};

afterEach(() => {
  const store = storeFactory();
  store.dispatch({ type: actionTypes.AUTH_RESET_STATE });
});

test("action success return currect value", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.AUTH_ACTION_SUCCESS,
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
    currentStep: 1,
    loginInputs: initialState.loginInputs,
  });
});

test("action fail return currect value", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.AUTH_ACTION_FAIL,
    payload: "some error",
  });
  const newState = store.getState();
  expect(newState.authReducer).toStrictEqual({
    loading: false,
    error: "some error",
    expiry: null,
    user: {},
    success: false,
    signInInputs: initialState.signInInputs,
    loginInputs: initialState.loginInputs,
    currentStep: 1,
  });
});

test("should set signin inputs", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.AUTH_SIGN_SET_INPUT,
    name: "firstName",
    value: "abc",
    error: "some error",
    page: "page1",
  });
  const newState = store.getState().authReducer;
  const expectedState = {
    name: "firstName",
    value: "abc",
    error: "some error",
  };
  expect(newState.signInInputs.page1[0]).toEqual(expectedState);
});

test("should set login inputs", () => {
  const store = storeFactory();
  store.dispatch({
    type: actionTypes.AUTH_LOGIN_SET_INPUT,
    name: "email",
    value: "abc",
    error: "some error",
  });
  const newState = store.getState().authReducer;
  const expectedState = { name: "email", value: "abc", error: "some error" };
  expect(newState.loginInputs[0]).toEqual(expectedState);
});

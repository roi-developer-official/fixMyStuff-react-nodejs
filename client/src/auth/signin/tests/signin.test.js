import { mount, shallow } from "enzyme";
import { Provider, useDispatch, useSelector } from "react-redux";
import { findByAttr, storeFactory, user } from "../../../tests/testUtils";
import { signIn as mockSignin, actionTypes } from "../../../actions/authAction";
import SignIn, { signInReducer } from "../signin";
import React, { useReducer } from "react";

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useReducer: jest.fn(),
// }));
// jest.mock("../../../actions/authAction");

const setup = (initialState = {}, props = {}) => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <SignIn {...props} />
    </Provider>
  );
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe("signin page", () => {
  let wrapper;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ loading: false, error: null})
    wrapper = setup();
  });
  afterEach(() => {
  });

  test("renders without errors", () => {
    const signUpComponent = findByAttr(wrapper, "component-signin");
    expect(signUpComponent).toHaveLength(1);
  });

  test("reset store value initialy'", () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.RESET_STATE,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  
  //unit tests
  describe("signin reducer", () => {
    const initialState = {
      currentStep: 1,
      inputs: new Map(),
      signupSuccess: null,
    };
    const inputs = [
      { name: "firstName", value: "bob" },
      { name: "lastName", value: "alice" },
    ];

    test("sohuld increment the step by 1", () => {
      const action = signInReducer(initialState, { type: "INCREMENT_STEP" });
      expect(action).toMatchObject({
        ...initialState,
        currentStep: 2,
      });
    });

    test("should decrement the step by 1", () => {
      const action = signInReducer(initialState, { type: "DECREMENT_STEP" });
      expect(action).toMatchObject({
        ...initialState,
        currentStep: 0,
      });
    });

    test("should update inputs", () => {
      const inputMap = new Map();
      inputMap.set("firstName", "bob");
      inputMap.set("lastName", "alice");
      const action = signInReducer(initialState, {
        type: "SET_INPUTS",
        payload: inputs,
      });
      expect(action).toMatchObject({
        ...initialState,
        inputs: inputMap,
      });
    });
  });
});

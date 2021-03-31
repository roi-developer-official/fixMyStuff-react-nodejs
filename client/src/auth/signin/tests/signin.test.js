import { mount } from "enzyme";
import { Provider, useDispatch} from "react-redux";
import { findByAttr, storeFactory } from "../../../tests/testUtils";
import { actionTypes } from "../../../actions/authAction";
import SignIn, { signInReducer } from "../signin";
import React from "react";
import { FormFeedback } from "../../../Global_UI";

const setup = (initialState = {}, props = {}) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <SignIn {...props} />
    </Provider>
  );
};
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("signin page", () => {
  let wrapper;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    wrapper = setup({ authReducer: { loading: false, error: null } });
  });

  test("renders without errors", () => {
    const signUpComponent = findByAttr(wrapper, "component-signin");
    expect(signUpComponent).toHaveLength(1);
  });

  //unit
  test("reset store value initialy'", () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.RESET_STATE,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  //unit
  test("should not show feedback by default", () => {
    const wrapper = setup({
      authReducer: { loading: false, error: false, success: false },
    });
    const message = wrapper.find("div.form_feedback_wrapper");
    expect(message).toHaveLength(0);
  });

  //integration
  test("should show a feedback on error", () => {
    const wrapper = setup({
      authReducer: { loading: false, error: true, success: false },
    });
    expect(wrapper.find(FormFeedback)).toHaveLength(1);
    const message = wrapper.find("div.form_feedback_wrapper");
    expect(message).toHaveLength(1);
    expect(message.text()).toBe("Signup Failed!");
  });

  //integration
  test("should show a feedback on signing success", () => {
    const wrapper = setup({
      authReducer: { loading: false, error: false, success: true },
    });
    expect(wrapper.find(FormFeedback)).toHaveLength(1);
    const message = wrapper.find("div.form_feedback_wrapper");
    expect(message).toHaveLength(1);
    expect(message.text()).toBe("Signup Successfuly!");
  });

  //integration
  test("should not show loading spinner by default", () => {
    const wrapper = setup({
      authReducer: { loading: false, error: false, success: false },
    });
    expect(findByAttr(wrapper, "loading-spinner")).toHaveLength(0);
  });

  //integration
  test("should show loading spinner when loading", () => {
    const wrapper = setup({
      authReducer: { loading: true, error: false, success: false },
    });
    expect(findByAttr(wrapper, "loading-spinner")).toHaveLength(1);
  });

  //unit tests
  describe("signin reducer", () => {
    const initialState = {
      currentStep: 1,
      inputs: [
        { name: "firstName", value: "" },
        { name: "lastName", value: "" },
      ],
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
      const action = signInReducer(initialState, {
        type: "SET_INPUTS",
        payload: { inputs },
      });
      expect(action).toMatchObject({
        ...initialState,
        inputs: inputs,
      });
    });
  });
});

import { mount, shallow } from "enzyme";
import { Provider, useDispatch, useSelector } from "react-redux";
import { findByAttr, storeFactory } from "../../../tests/testUtils";
import { actionTypes } from "../../../actions/authAction";
import SignIn from "../signin";
import React from "react";
import { FormFeedback } from "../../../Global_UI";


const initialState = {
  loading: false,
  error: null,
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
      { name: "terms", value: "", error: "" },
    ],
  },
  currentStep: 1,
};
let store;
const setup = (state = {}, props = {}) => {
  store = storeFactory({ authReducer: { ...state } });
  return mount(
    <Provider store={store}>
      <SignIn {...props} />
    </Provider>
  );
};

describe("signin page", () => {
  test("renders without errors", () => {
    const wrapper = setup(initialState);
    const signUpComponent = findByAttr(wrapper, "component-signin");
    expect(signUpComponent).toHaveLength(1);
  });

  test("should not show feedback by default", () => {
    const wrapper = setup(initialState);
    expect(wrapper.find(FormFeedback)).toHaveLength(1);
    const message = wrapper.find("div.form_feedback_wrapper");
    expect(message).toHaveLength(0);
  });

  test("should show a feedback on error", async () => {
    const wrapper = setup(initialState);
    store.dispatch({ type: actionTypes.AUTH_ACTION_FAIL, payload: "some error" });
    wrapper.update();
    const message = wrapper.find("div.form_feedback_wrapper");
    expect(message).toHaveLength(1);
    expect(message.text()).toBe("some error");
  });

  test("should show a feedback on signing success", () => {
    const wrapper = setup(initialState);
    store.dispatch({
      type: actionTypes.AUTH_ACTION_SUCCESS,
      payload: { user: "some user", expiry: "today" },
    });
    wrapper.update();
    const message = wrapper.find("div.form_feedback_wrapper");
    expect(message).toHaveLength(1);
    expect(message.text()).toBe("Signup Successfuly!");
  });

  
  test("should not show loading spinner by default", () => {
    const wrapper = setup(initialState);
    expect(findByAttr(wrapper, "loading-spinner")).toHaveLength(0);
  });

  
  test("should show loading spinner when loading", () => {
    const wrapper = setup(initialState);
    store.dispatch({ type: actionTypes.AUTH_ACTION_START });
    wrapper.update();
    expect(findByAttr(wrapper, "loading-spinner")).toHaveLength(1);
  });
});

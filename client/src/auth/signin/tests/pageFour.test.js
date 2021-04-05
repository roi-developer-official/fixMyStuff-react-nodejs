import { mount } from "enzyme";
import { validation } from "../../../shared/";
import PageFour from "../pageFour";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";

const mockDispatch = jest.fn();
const mockChangePage = jest.fn();
const mockSetState = jest.fn();

let state = {
  page4: [
    { name: "email", value: 1, error: "" },
    { name: "password", value: "", error: "" },
    { name: "confirmPassword", value: "", error: "" },
    { name: "terms", value: "", error: "" },
  ],
};
jest.mock("../../../shared");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useRef: jest.fn(),
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const setup = (props = {}) => {
  return mount(<PageFour {...props} />);
};

beforeEach(() => {
  useSelector.mockReturnValue(state);
  useDispatch.mockReturnValue(mockDispatch);
  useState.mockReturnValue([false, mockSetState]);
  useRef.mockReturnValue({
    current: [
      { focus: () => {} },
      { focus: () => {} },
      { focus: () => {} },
      { focus: () => {} },
    ],
  });
});
afterEach(() => {
  mockDispatch.mockClear();
});

test("should render 4 inputs", () => {
  const wrapper = setup();
  const inputs = wrapper.find("input");
  expect(inputs).toHaveLength(4);
});

test("sould render 2 buttons", () => {
  const wrapper = setup();
  const buttons = wrapper.find("button");
  expect(buttons).toHaveLength(2);
});

test("should hanlde change on the inputs", () => {
  const wrapper = setup();
  const emailInput = wrapper.find({ "data-test": "email" });
  emailInput.simulate("change", { target: { name: "email", value: "abc" } });
  expect(mockDispatch).toBeCalledWith({
    error: "",
    name: "email",
    type: "AUTH_SIGN_SET_INPUT",
    value: "abc",
    page: "page4",
  });
});

test("should not change the page when inputs invalid", () => {
  const wrapper = setup({ changePage: mockChangePage });
  let nextButton = wrapper.find({ "data-test": "button-done" });
  nextButton.simulate("click");
  expect(mockChangePage).not.toBeCalled();
});

test("should not submit the page with errors", () => {
  const newState = JSON.parse(JSON.stringify(state));
  newState.page4[0].value = "test@test.com";
  newState.page4[1].value = "qwqwqwQ1";
  newState.page4[2].value = "not empty";
  newState.page4[1].error = "some error";
  useSelector.mockReturnValueOnce(newState);
  const wrapper = setup({ changePage: mockChangePage });
  let nextButton = wrapper.find({ "data-test": "button-done" });
  nextButton.simulate("click");
  expect(mockChangePage).not.toBeCalled();
});

test("should not change the comfirm-password error when input is not touched", () => {
  const wrapper = setup();
  const password = wrapper.find({ "data-test": "password" });
  password.simulate("change", {
    target: { name: "password", value: "abc" },
  });
  expect(mockDispatch).not.toBeCalledWith({
    error: "",
    name: "confirmPassword",
    page: "page4",
    type: "AUTH_SIGN_SET_INPUT",
    value: "",
  });
});

test("should set isTouched on confirm-password", () => {
  const wrapper = setup();
  const conPassword = wrapper.find({ "data-test": "confirmPassword" });
  conPassword.simulate("change", {
    target: { name: "confirmPassword", value: "abc" },
  });
  expect(mockSetState).toBeCalledWith(true);
});

test("should update confirm-password on password change when touched", () => {
  useState.mockReturnValueOnce([true, mockSetState]);
  const mockState = JSON.parse(JSON.stringify(state));
  mockState.page4[2].value = "abc";
  useSelector.mockReturnValueOnce(mockState);
  const wrapper = setup();
  const password = wrapper.find({ "data-test": "password" });
  password.simulate("change", {
    target: { name: "password", value: "abd" },
  });

  expect(validation).toBeCalledWith({ compareTo: true }, "abc", "abd");
  expect(mockDispatch).toBeCalledWith({
    error: undefined,
    name: "confirmPassword",
    page: "page4",
    type: "AUTH_SIGN_SET_INPUT",
    value: "abc",
  });
});

test("should submit the page when inputs valid", () => {
  const newState = JSON.parse(JSON.stringify(state));
  newState.page4[0].value = "test@test.com";
  newState.page4[1].value = "qwqwqwQ1";
  newState.page4[2].value = "qwqwqwQ1";
  newState.page4[3].value = true;
  useSelector.mockReturnValueOnce(newState);
  const wrapper = setup({ changePage: mockChangePage });
  let nextButton = wrapper.find({ "data-test": "button-done" });
  nextButton.simulate("click");
  expect(mockChangePage).toBeCalled();
});

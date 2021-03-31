import { mount } from "enzyme";
import PageFour from "../pages/pageFour";
import { useReducer, useRef } from "react";

let inputs;
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useReducer: jest.fn(),
  useRef: jest.fn(),
}));

const setup = (props = {}) => {
  return mount(<PageFour {...props} />);
};

const mockChangePage = jest.fn();
const mockDispatch = jest.fn();
let wrapper;
let email;
let password;
let confirmPassword;
let buttons;

beforeEach(() => {
  inputs = [
    { name: "email", value: "", error: "" },
    { name: "password", value: "", error: "" },
    { name: "confirmPassword", value: "", error: "" },
  ];
  useReducer.mockReturnValue([{ inputs }, mockDispatch]);
  useRef.mockReturnValue({ current: [] });

  wrapper = setup({ changePage: mockChangePage });
  email = wrapper.find({ "data-test": "email" });
  password = wrapper.find({ "data-test": "password" });
  confirmPassword = wrapper.find({ "data-test": "confirmPassword" });
  buttons = wrapper.find("button");
});

test("should render 3 inputs", () => {
  expect(email).toHaveLength(1);
  expect(password).toHaveLength(1);
  expect(confirmPassword).toHaveLength(1);
});

test("sould render 2 buttons", () => {
  expect(buttons).toHaveLength(2);
});


test("should hanlde change on the inputs", () => {
  email.simulate("change", {
    target: { name: "email", value: "test@test.com" },
  });
  expect(mockDispatch).toBeCalledWith({
    error: "",
    name: "email",
    type: "SET_INPUT",
    value: "test@test.com",
  });
  password.simulate("change", { target: { name: "password", value: "12345" } });
  expect(mockDispatch).toBeCalledWith({
    error: "",
    name: "password",
    type: "SET_INPUT",
    value: "12345",
  });
  confirmPassword.simulate("change", {
    target: { name: "confirmPassword", value: "12345" },
  });
  expect(mockDispatch).toBeCalledWith({
    error: "",
    name: "confirmPassword",
    type: "SET_INPUT",
    value: "12345",
  });
});

test("should set errors on blur", () => {
  email.simulate("blur");
  expect(mockDispatch).toBeCalledWith({
    error: "this field is required",
    name: "email",
    type: "SET_INPUT",
    value: "",
  });
});

test("should not change the page when inputs invalid", () => {
  buttons.at(1).simulate("click");
  expect(mockChangePage).not.toBeCalled();
});

test("should submit the page when inputs valid", ()=>{
  inputs[0].value = "test@test.com";
  inputs[1].value = "qwqwqwQ1";
  inputs[2].value = "qwqwqwQ1";
  buttons.at(1).simulate("click");
  expect(mockChangePage).toBeCalled();
});

test("should not chagne the page with errors", () => {
  inputs[0].value = "bla bla";
  inputs[1].value = "also bla bla";
  inputs[2].value = "again bla bla";
  inputs[1].error = "some error";
  buttons.at(1).simulate("click");
  expect(mockChangePage).not.toBeCalled();
});

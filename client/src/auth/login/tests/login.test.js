import { mount } from "enzyme";
import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMemoryHistory } from "history";
import Login from "../login";
import { Router } from "react-router";
import { findByAttr } from "../../../tests/testUtils";
import { actionTypes , login } from "../../../actions/authAction";
import { SET_INPUT } from "../../signin/pages/pagesShared";

let mockDispatch = jest.fn();
let mockReactDispatch = jest.fn();
jest.mock("../../../actions/authAction")
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useReducer: jest.fn(),
}));

beforeEach(() => {
  useReducer.mockReturnValue([
    {
      inputs: [
        { name: "email", value: "", error: "" },
        { name: "password", value: "", error: "" },
      ],
    },
    mockReactDispatch,
  ]);
  useSelector.mockReturnValue({ loading: false, error: null, success: false });
  useDispatch.mockReturnValue(mockDispatch);
});

const history = createMemoryHistory();
const setup = () => {
  return mount(
    <Router history={history}>
      <Login />
    </Router>
  );
};

test("should render without errors", () => {
  const wrapper = setup();
  expect(wrapper).toHaveLength(1);
});

test("should dispatch reset on page load", () => {
  const wrapper = setup();
  expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.RESET_STATE });
});

test("should dispatch input change with currect values", () => {
  const wrapper = setup();
  const input = findByAttr(wrapper, "email");
  input.simulate("change", { target: { value: "abc", name: "email" } });
  expect(mockReactDispatch).toBeCalledWith({
    error: "",
    name: "email",
    type: SET_INPUT,
    value: "abc",
  });
});

test("should redirect to home on cancel clicked", () => {
  const wrapper = setup();
  history.push("/login");
  const cancelButton = findByAttr(wrapper, "button-cancel");
  expect(cancelButton).toHaveLength(1);
  cancelButton.simulate("click");
  expect(history.location.pathname).toBe("/");
});

test("should not submit the page with values empty", () => {
  const wrapper = setup();
  const doneButton = findByAttr(wrapper, "button-login");
  expect(doneButton).toHaveLength(1);
  mockDispatch.mockClear();
  doneButton.simulate("click");
  expect(mockDispatch).not.toHaveBeenCalled();
});

test("should not submit the page with errors", () => {
  useReducer.mockReturnValue([
    {
      inputs: [
        { name: "email", value: "hello", error: "some error" },
        { name: "password", value: "in here", error: "" },
      ],
    },
    mockReactDispatch,
  ]);
  const wrapper = setup();
  const doneButton = findByAttr(wrapper, "button-login");
  mockDispatch.mockClear();
  doneButton.simulate("click");
  expect(mockDispatch).not.toHaveBeenCalled();
});

test("should set error when email is not an email", () => {
  const wrapper = setup();
  const input = findByAttr(wrapper, "email");
  input.simulate("change", { target: { value: "abc", name: "email" } });
  mockReactDispatch.mockClear();
  input.simulate("blur", { target: { value: "abc", name: "email" } });
  expect(mockReactDispatch).toBeCalledWith({
    error: "please enter a valid email",
    name: "email",
    type: SET_INPUT,
    value: "abc",
  });
});

test("should submit the page with the right values", () => {
  useReducer.mockReturnValue([
    {
      inputs: [
        { name: "email", value: "test@test.com", error: "" },
        { name: "password", value: "in here", error: "" },
      ],
    },
    mockReactDispatch,
  ]);
  const wrapper = setup();
  const doneButton = findByAttr(wrapper, "button-login");
  mockDispatch.mockClear();
  doneButton.simulate("click");
  expect(mockDispatch).toHaveBeenCalledWith({type: actionTypes.ACTION_START});
  expect(login).toBeCalled();
});


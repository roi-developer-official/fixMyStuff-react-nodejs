import { mount } from "enzyme";
import { useSelector, useDispatch } from "react-redux";
import { createMemoryHistory } from "history";
import Login from "../login";
import { Router } from "react-router";
import { findByAttr } from "../../../tests/testUtils";
import { actionTypes, login } from "../../../actions/authAction";

let mockDispatch = jest.fn();
jest.mock("../../../actions/authAction");
const loginInputs = [
  { name: "email", value: "", error: "" },
  { name: "password", value: "", error: "" },
];
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

beforeEach(() => {
  useSelector.mockReturnValue({
    loading: false,
    error: null,
    success: false,
    loginInputs: loginInputs,
  });
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

test('number of inputs 2', ()=>{
  const wrapper = setup();
  const inputs = wrapper.find("input");
  expect(inputs).toHaveLength(2);
});

test('number of buttons 2', ()=>{
  const wrapper = setup();
  const inputs = wrapper.find("button");
  expect(inputs).toHaveLength(2);
})

test("should dispatch input change with currect values", () => {
  const wrapper = setup();
  const input = findByAttr(wrapper, "email");
  input.simulate("change", { target: { value: "abc", name: "email" } });
  expect(mockDispatch).toBeCalledWith({
    error: "",
    name: "email",
    type: "LOGIN_SET_INPUT",
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
  const mockInputs = JSON.parse(JSON.stringify(loginInputs));
  mockInputs[0].error = "some error";
  useSelector.mockReturnValueOnce({
    loading: false,
    error: null,
    success: false,
    loginInputs: mockInputs,
  });
  const wrapper = setup();
  const doneButton = findByAttr(wrapper, "button-login");
  mockDispatch.mockClear();
  doneButton.simulate("click");
  expect(mockDispatch).not.toHaveBeenCalled();
});

test("should submit the page with the right values", () => {
  const mockInputs = JSON.parse(JSON.stringify(loginInputs));
  mockInputs[0].value = "abc";
  mockInputs[1].value = "def";
  useSelector.mockReturnValueOnce({
    loading: false,
    error: null,
    success: false,
    loginInputs: mockInputs,
  });
  const wrapper = setup();
  const doneButton = findByAttr(wrapper, "button-login");
  mockDispatch.mockClear();
  doneButton.simulate("click");
  expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.ACTION_START });
  expect(login).toBeCalled();
});

test("should not show loader by default", () => {
  const wrapper = setup();
  const loader = wrapper.find({ "data-test": "loading-spinner" });
  expect(loader).toHaveLength(0);
});

test("should show loaded while loading", () => {
  useSelector.mockReturnValueOnce({
    loading: true,
    error: null,
    success: false,
    loginInputs: loginInputs,
  });
  const wrapper = setup();
  const loader = wrapper.find({ "data-test": "loading-spinner" });
  expect(loader).toHaveLength(1);
});

test("should not show feedback by default", () => {
  const wrapper = setup();
  const feedback = wrapper.find({ className: "form_feedback_wrapper" });
  expect(feedback).toHaveLength(0);
});

test("should show feedback with error message", () => {
  useSelector.mockReturnValueOnce({
    loading: false,
    error: "some error",
    success: false,
    loginInputs: loginInputs,
  });
  const wrapper = setup();
  const feedback = wrapper.find({ className: "form_feedback_wrapper" });
  expect(feedback).toHaveLength(1);
  expect(feedback.text()).toBe("some error");
});

test("should show feedback with success message", () => {
  useSelector.mockReturnValueOnce({
    loading: false,
    error: null,
    success: true,
    loginInputs: loginInputs,
  });
  const wrapper = setup();
  const feedback = wrapper.find({ className: "form_feedback_wrapper" });
  expect(feedback).toHaveLength(1);
  expect(feedback.text()).toBe("Login Successfuly!");
});

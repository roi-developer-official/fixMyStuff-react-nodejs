import { mount } from "enzyme";
import { Provider, useDispatch } from "react-redux";
import { findByAttr, storeFactory } from "../tests/testUtils";
import { actionTypes, signIn } from "../actions/authAction";
import SignIn from "./signin";

const mockDispatch = jest.fn();
let wrapper;
let store;

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const setup = (initialState = {}, props = {}) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <SignIn {...props} />
    </Provider>
  );
};

beforeEach(() => {
  useDispatch.mockReturnValue(mockDispatch);
  wrapper = setup();
});

test("renders without errors", () => {
  const signUpComponent = findByAttr(wrapper, "component-signin");
  expect(signUpComponent).toHaveLength(1);
});

test("reset store value initialy'", () => {
  expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.RESET_STATE });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});



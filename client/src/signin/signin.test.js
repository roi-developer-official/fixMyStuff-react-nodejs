import { mount } from "enzyme";
import { Provider } from "react-redux";
import { findByAttr, storeFactory } from "../tests/testUtils";
import { signIn } from "../actions/authAction";
import SignIn from "./signin";
// activate global mock to make sure signIn doesn't make network call
jest.mock("../actions/authAction");

/**
 * Setup function fo Signup Component
 * @returns {Wrapper}
 */

const setup = () => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
};


test('renders without errors', ()=>{
    const wrapper = setup();
    const signUpComponent = findByAttr(wrapper, "component-signin");
    expect(signUpComponent).toHaveLength(1);
})

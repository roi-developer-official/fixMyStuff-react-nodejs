import { shallow } from "enzyme";
import AvatarMenu from "../avatarMenu";
import { findByAttr } from "../../tests/testUtils";

let mockDispatch = jest.fn()
jest.mock("react-redux", () => {
  return {
    useDispatch: ()=>mockDispatch,
    useSelector: ()=> jest.fn()
  };
});

const setup = ()=>{
  return shallow(
    <AvatarMenu />
);
}
test('should display 2 items', ()=>{
  const wrapper = setup();
  const items = wrapper.find("li");
  expect(items).toHaveLength(2);
});

test("should dipatch on logout", () => {
  const wrapper = setup();
  const logoutButton = findByAttr(wrapper, "logout-button");
  logoutButton.simulate("click");
  expect(mockDispatch).toBeCalled();
});

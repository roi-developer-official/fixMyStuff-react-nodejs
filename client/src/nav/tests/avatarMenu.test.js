import { shallow } from "enzyme";
import AvatarMenu from "../avatar/menu/avatarMenu";
import { findByAttr } from "../../tests/testUtils";

let mockDispatch = jest.fn()
jest.mock("react-redux", () => {
  return {
    useDispatch: ()=>mockDispatch,
    useSelector: ()=> jest.fn()
  };
});

test("should dipatch on logout", () => {
  const wrapper = shallow(
      <AvatarMenu />
  );
  const logoutButton = findByAttr(wrapper, "logout-button");
  logoutButton.simulate("click");
  expect(mockDispatch).toBeCalled();
});



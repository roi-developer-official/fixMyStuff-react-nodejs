import { shallow } from "enzyme";
import PageTwo from "../pages/pageTwo";

const setup = (props = {}) => {
  return shallow(<PageTwo />);
};
test("should render without error", () => {
  const wrapper = setup();
  const wrappingDiv = wrapper.find({ className: "add_post_page" });
  expect(wrappingDiv).toHaveLength(1);
});



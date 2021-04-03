import { shallow } from "enzyme";
import AddImagePage from "../addImagePage";

const setup = (props = {}) => {
  return shallow(<AddImagePage {...props} />);
};

let buttons = [
  { label : "Next"},
  { label : "Done"},
]
test("should render without errors", () => {
    const wrapper = setup({buttons: buttons});
    const wrappingDiv = wrapper.find({className : "add_image_page"});
    expect(wrappingDiv).toHaveLength(1);
});

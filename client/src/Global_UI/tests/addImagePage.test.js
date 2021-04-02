import { shallow } from "enzyme";
import AddImagePage from "../addImagePage";

const setup = (props = {}) => {
  return shallow(<AddImagePage {...props} />);
};

test("should render without errors", () => {
    const wrapper = setup();
    const wrappingDiv = wrapper.find({className : "add_image_page"});
    expect(wrappingDiv).toHaveLength(1);
});

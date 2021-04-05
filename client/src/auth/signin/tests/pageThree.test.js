import { mount } from "enzyme";
import PageThree from "../PageThree";
import { useDispatch, useSelector } from "react-redux";

const setup = (props = {}) => {
  return mount(<PageThree {...props} />);
};

const mockDispatch = jest.fn();
const mockChangePage = jest.fn();
let inputs = {
  page3: [
    { name: "role", value: 1, error: "" },
    { name: "profession", value: "", error: "" },
    { name: "experience", value: "", error: "" },
  ],
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("page Three", () => {
  beforeEach(() => {
    useSelector.mockReturnValue(inputs);
    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    inputs = {
      page3: [
        { name: "role", value: 1, error: "" },
        { name: "profession", value: "", error: "" },
        { name: "experience", value: "", error: "" },
      ],
    };
    mockDispatch.mockClear();
  });

  test("number of buttons is 2", () => {
    const wrapper = setup();
    const inputs = wrapper.find("button");
    expect(inputs).toHaveLength(2);
  });

  test("number of radio input 2", () => {
    const wrapper = setup();
    const inputs = wrapper.find({ inputType: "radio" });
    expect(inputs).toHaveLength(2);
  });

  test("number of select 2", () => {
    const wrapper = setup();
    const inputs = wrapper.find("select");
    expect(inputs).toHaveLength(2);
  });

  test("select not show by default", () => {
    const wrapper = setup();
    const wrappingDiv = wrapper.find({ className: "form_select_wrapper" });
    expect(wrappingDiv).toHaveLength(2);
  });

  test("select is showen when `yes` selected", () => {
    inputs.page3[0].value = 2;
    useSelector.mockReturnValueOnce(inputs);
    let wrapper = setup();
    expect(
      wrapper.find({ className: "form_select_wrapper show" })
    ).toHaveLength(2);
  });

  test("should not be visible when show is false", () => {
    const wrapper = setup({ show: false });
    const wrappingDiv = wrapper.find({ className: "form_page" });
    expect(wrappingDiv).toHaveLength(1);
  });

  test("should be visible when show is true", () => {
    const wrapper = setup({ show: true });
    const wrappingDiv = wrapper.find({ className: "form_page show" });
    expect(wrappingDiv).toHaveLength(1);
  });

  test("should render radio input `no` checked", () => {
    let wrapper = setup();
    let inputs = wrapper.find({ "data-test": "role" });
    expect(inputs.at(0).getDOMNode().value).toBe("2");
    expect(inputs.at(0).getDOMNode().checked).toBeFalsy();
    expect(inputs.at(1).getDOMNode().value).toBe("1");
    expect(inputs.at(1).getDOMNode().checked).toBeTruthy();
  });

  test("should dispatch with right values with input 1", () => {
    let wrapper = setup();
    let inputs = wrapper.find({ "data-test": "role" });
    inputs.at(0).simulate("change", { target: { value: 1, name: "role" } });
    expect(mockDispatch).toBeCalledWith({
      name: "role",
      type: "AUTH_SIGN_SET_INPUT",
      value: 1,
      error: "",
      page: "page3"
    });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test("should dispatch the right on select change", () => {
    const wrapper = setup();
    const select = wrapper.find({ "data-test": "profession" });
    select.simulate("change", { target: { name: "profession", value: "abc" } });
    expect(mockDispatch).toBeCalledWith({
      name: "profession",
      type: "AUTH_SIGN_SET_INPUT",
      value: "abc",
      error: "",
      page: "page3"
    });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test("should move to next page when selected with role 1", () => {
    const wrapper = setup({ changePage: mockChangePage });
    const nextButton = wrapper.find({ "data-test": "button-next" });
    nextButton.simulate("click");
    expect(mockChangePage).toBeCalled();
  });

  test("should move to next page when selected 1 even with errors", () => {
    inputs.page3[1].error = "some error";
    useSelector.mockReturnValueOnce(inputs);
    const wrapper = setup({ changePage: mockChangePage });
    const nextButton = wrapper.find({ "data-test": "button-next" });
    nextButton.simulate("click");
    expect(mockChangePage).toBeCalled();
  });

  test("should not move page when role is 2 and the values empty", () => {
    inputs.page3[1].value = "";
    inputs.page3[2].value = "";
    inputs.page3[0].value = 2;
    useSelector.mockReturnValueOnce(inputs);
    const wrapper = setup({ changePage: mockChangePage });
    const nextButton = wrapper.find({ "data-test": "button-next" });
    nextButton.simulate("click");
    expect(mockChangePage).not.toBeCalled();
  });


  test("should not move page when role is 2 with errors", () => {
    inputs.page3[1].error = "some error";
    inputs.page3[2].value = "";
    inputs.page3[0].value = 2;
    useSelector.mockReturnValueOnce(inputs);
    const wrapper = setup({ changePage: mockChangePage });
    const nextButton = wrapper.find({ "data-test": "button-next" });
    nextButton.simulate("click");
    expect(mockChangePage).not.toBeCalled();
  });


});

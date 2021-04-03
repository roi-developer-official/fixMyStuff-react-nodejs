import { mount } from "enzyme";
import PageFour from "../pages/pageFour";
import { useSelector, useDispatch } from "react-redux";

const mockDispatch = jest.fn();
const mockChangePage = jest.fn();
let inputs = {
  page4: [
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

const setup = (props = {}) => {
  return mount(<PageFour {...props} />);
};

beforeEach(() => {
  useSelector.mockReturnValue(inputs);
  useDispatch.mockReturnValue(mockDispatch);
});
afterEach(() => {
  inputs = {
    page4: [
      { name: "role", value: 1, error: "" },
      { name: "profession", value: "", error: "" },
      { name: "experience", value: "", error: "" },
    ],
  };
  mockDispatch.mockClear();
});

test("should render 3 inputs", () => {
  const wrapper = setup();
  const inputs = wrapper.find("input");
  expect(inputs).toHaveLength(3);
});

test("sould render 2 buttons", () => {
  const wrapper = setup();
  const buttons = wrapper.find("button");
  expect(buttons).toHaveLength(2);
});

test("should hanlde change on the inputs", () => {
  const wrapper = setup();
  const emailInput = wrapper.find({ "data-test": "email" });
  emailInput.simulate("change", { target: { name: "email", value: "abc" } });
  expect(mockDispatch).toBeCalledWith({error: "", name: "email", type: "AUTH_SIGN_SET_INPUT", value :"abc", page:"page4"});
});


test("should set errors on blur", () => {
  const wrapper = setup();
  const emailInput = wrapper.find({ "data-test": "email" });
  emailInput.simulate("blur", { target: { name: "email", value: "" } });
  expect(mockDispatch).toBeCalledWith({
    error: "this field is required",
    name: "email",
    type: "AUTH_SIGN_SET_INPUT",
    value: "",
    page:"page4"
  });
});

test("should not change the page when inputs invalid", () => {
  const wrapper = setup({ changePage : mockChangePage});
  let nextButton = wrapper.find({"data-test":"button-done"})
  nextButton.simulate("click");
  expect(mockChangePage).not.toBeCalled();
});

test("should not submit the page with errors", () => {
  inputs.page4[0].value = "test@test.com";
  inputs.page4[1].value = "qwqwqwQ1";
  inputs.page4[2].value = "not empty";
  inputs.page4[1].error = "some error";
  useSelector.mockReturnValueOnce(inputs);
  const wrapper = setup({ changePage : mockChangePage});
  let nextButton = wrapper.find({"data-test":"button-done"})
  nextButton.simulate("click");
  expect(mockChangePage).not.toBeCalled();
});

test("should submit the page when inputs valid", () => {
  inputs.page4[0].value = "test@test.com";
  inputs.page4[1].value = "qwqwqwQ1";
  inputs.page4[2].value = "qwqwqwQ1";
  useSelector.mockReturnValueOnce(inputs);
  const wrapper = setup({ changePage : mockChangePage});
  let nextButton = wrapper.find({"data-test":"button-done"})
  nextButton.simulate("click");
  expect(mockChangePage).toBeCalled();
});



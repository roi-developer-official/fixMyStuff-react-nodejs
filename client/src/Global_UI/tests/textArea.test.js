import { shallow } from "enzyme";
import { useState } from "react";
import { Textarea } from "../textarea";

const updateInputMock = jest.fn();
const mockSetState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

beforeEach(() => {
  useState.mockReturnValue([{ error: "", value: "" }, mockSetState]);
});

afterEach(() => {
  mockSetState.mockClear();
  updateInputMock.mockClear();
});
const setup = (props = {}) => {
  return shallow(<Textarea {...props} />);
};

test("should render without error", () => {
  const wrapper = setup();
  const textArea = wrapper.find("textarea");
  const wrappingDiv = wrapper.find({ className: "form_textarea_wrapper" });
  expect(textArea).toHaveLength(1);
  expect(wrappingDiv).toHaveLength(1);
});

test("should render cols and rows according to props", () => {
  const wrapper = setup({ rows: 10, cols: 10, name: "test-ta" });
  const textArea = wrapper.find({ "data-test": "test-ta" });
  expect(textArea.props().rows).toBe(10);
  expect(textArea.props().cols).toBe(10);
});

test("should update state on input change and call updateInput", () => {
  const wrapper = setup({ updateInput: updateInputMock });
  const textArea = wrapper.find("textarea");
  textArea.simulate("change", {
    target: { name: "description", value: "abc" },
  });
  expect(mockSetState).toBeCalledWith({ error: "", value: "abc" });
  expect(updateInputMock).toBeCalledWith("description", "abc", "");
});

test("should set error on blur", () => {
  const wrapper = setup({ updateInput: updateInputMock, validations: { required : true } });
  const textArea = wrapper.find("textarea");
  textArea.simulate("change", {
    target: { name: "description", value: "" },
  });
  mockSetState.mockClear();
  updateInputMock.mockClear();
  textArea.simulate("blur", { target: { name: "description" } });

  expect(mockSetState).toBeCalledWith({ error: "this field is required", value: "" });
  expect(updateInputMock).toBeCalledWith("description", "", "this field is required");
});

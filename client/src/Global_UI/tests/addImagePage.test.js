import { mount } from "enzyme";
import { useState } from "react";
import {AddImagePage} from "../";

const mockSetState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
const setup = (props = {}) => {
  return mount(<AddImagePage {...props} />);
};

let buttons = [{ label: "Next" }, { label: "Done" }];

beforeEach(() => {
  useState.mockReturnValue([{ name: "image", value: "" }, mockSetState]);
});
test("should render without errors", () => {
  const wrapper = setup({ buttons: buttons });
  const wrappingDiv = wrapper.find({ className: "form_page" });
  expect(wrappingDiv).toHaveLength(1);
});

const file = new File([], "file", {
  type: "image/",
});
const event = {
  preventDefault: () => {},
  stopPropagation: () => {},
  target: {
    files: [file],
    type: "change",
  },
};

test("should set image when change occures on child component AddImage", () => {
  const wrapper = setup({ buttons: buttons });
  const fileInput = wrapper.find({ type: "file" });
  expect(fileInput).toHaveLength(1);
  fileInput.simulate("change", event);
  expect(mockSetState).toBeCalledWith({ name: "image", value: file });
});

test('should clear the image when delete occures on child component AddImage', ()=>{
  useState.mockReturnValueOnce([{name: "image", value: file}, mockSetState]);
  const wrapper = setup({ buttons: buttons });
  const deleteButton = wrapper.find({"data-test":"delete_image"});
  deleteButton.simulate("click");
  expect(mockSetState).toBeCalledWith({name :"image", value: null});
});


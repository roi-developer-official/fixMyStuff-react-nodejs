import { shallow } from "enzyme";
import AddImage from "../addImage";
import React from "react";

const mockSetInputValue = jest.fn();
const setup = (props = {}) => {
  return shallow(<AddImage setInputValue={mockSetInputValue} />);
};

const mockUseState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState) => [initialState, mockUseState],
}));

var file = new File([""], "filename", { type: "image/" });
let event;
let wrapper;

let warppingDiv;
beforeEach(() => {
  event = {
    dataTransfer: {
      files: [file],
    },
    preventDefault: () => {},
    stopPropagation: () => {},
  };
  wrapper = setup();
  warppingDiv = wrapper.find({ "data-test": "image-drop" });
});

afterEach(() => {
  event = {
    dataTransfer: {
      files: [file],
    },
    preventDefault: () => {},
    stopPropagation: () => {},
  };
});

describe("on drop and delete click", () => {
  test("should add class when a dragover is happening", () => {
    expect(warppingDiv.length).toBe(1);
    warppingDiv.simulate("dragover", event);
    expect(mockUseState).toBeCalledTimes(1);
    expect(mockUseState).toBeCalledWith(true);
  });

  test("should remove a class when dragleave is happening", () => {
    warppingDiv.simulate("dragleave", event);
    expect(mockUseState).toBeCalledTimes(1);
    expect(mockUseState).toBeCalledWith(false);
  });

  test("should set a file when on drop is happening", () => {
    event.type = "drop";
    warppingDiv.simulate("drop", event);
    expect(mockUseState).toBeCalledTimes(1);
    expect(mockSetInputValue).toBeCalledTimes(1);
    expect(mockUseState).toBeCalledWith(file);
    expect(mockSetInputValue).toBeCalledWith(file);
  });

  test("should delete a image on button click", async () => {
    event.dataTransfer.files[0] = undefined;
    const deleteButton = wrapper.find({ "data-test": "delete_image" });
    expect(deleteButton.length).toBe(1);
    deleteButton.simulate("click", event);
    expect(mockUseState).toBeCalledTimes(1);
    expect(mockUseState).toBeCalledWith(null);
    expect(mockSetInputValue).toBeCalledTimes(1);
    expect(mockSetInputValue).toBeCalledWith(null);
  });
});

describe("browse click", () => {


});

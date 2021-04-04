import { shallow } from "enzyme";
import { AddImage } from "../addImage";
import React, { useRef } from "react";

const mockSetInputValue = jest.fn();
const setup = (props = {}) => {
  return shallow(<AddImage setInputValue={mockSetInputValue} />);
};

const mockUseState = jest.fn();
const mockUseRef = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState) => [initialState, mockUseState],
  useRef: jest.fn(),
}));

let file = new File([""], "filename", { type: "image/" });
let event;
let wrapper;
let warppingDiv;
let browseButton;

beforeEach(() => {
  useRef.mockReturnValue({ current: { click: mockUseRef } });
  event = {
    dataTransfer: {
      files: [file],
    },
    preventDefault: () => {},
    stopPropagation: () => {},
    target: {
      value: ""
    }
  };
  wrapper = setup();
  warppingDiv = wrapper.find({ "data-test": "image-drop" });
  browseButton = wrapper.find({ "data-test": "browse-button" });
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

  test("should add class when dragover is happening on the browse button", () => {
    expect(browseButton.length).toBe(1);
    browseButton.simulate("dragover", event);
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

  test("should set a file when on drop is happening on the browse button", () => {
    event.type = "drop";
    browseButton.simulate("drop", event);
    expect(mockUseState).toBeCalledTimes(1);
    expect(mockSetInputValue).toBeCalledTimes(1);
    expect(mockSetInputValue).toBeCalledWith(file);
    expect(mockUseState).toBeCalledWith(file);
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
  let event;
  let fileInput;
  beforeEach(() => {
    fileInput = wrapper.find({ type: "file" });
    event = {
        target: {
          files: [file],
        },
        preventDefault: () => {},
        stopPropagation: () => {},
        type: "change",
      };
  });
  afterEach(() => {
    file = new File([""], "filename", { type: "image/" });
  });

  test("should open a browse on click", () => {
    browseButton.simulate("click");
    expect(mockUseRef).toBeCalledTimes(1);
  });

  test("should add a file on input change with an image", () => {
    expect(fileInput.length).toBe(1);
    fileInput.simulate("change", event);
    expect(mockUseState).toBeCalledTimes(1);
    expect(mockSetInputValue).toBeCalledTimes(1);
    expect(mockUseState).toBeCalledWith(file);
    expect(mockSetInputValue).toBeCalledWith(file);
  });

  test("should not set file if file is not image", () => {
        file = new File([""], "filename", { type: "text/" });
        event.target.files[0] = file;
        fileInput.simulate("change", event);
        expect(mockUseState).toBeCalledTimes(0);
        expect(mockSetInputValue).toBeCalledTimes(0);
  });

});



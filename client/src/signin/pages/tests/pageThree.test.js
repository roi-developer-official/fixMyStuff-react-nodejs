import { mount } from "enzyme";
import PageThree from "../PageThree";
import React, { useReducer, useRef } from "react";

const setup = (props = {}) => {
  return mount(<PageThree {...props} />);
};

let inputs;
let mockDispatch = jest.fn();
let wrapper;
let mockChangePage = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useReducer: jest.fn(),
  useRef: jest.fn(),
}));

beforeEach(() => {
  inputs = [
    { name: "role", value: 1, error: "" },
    { name: "profession", value: "", error: "" },
    { name: "experience", value: "", error: "" },
  ];
  useReducer.mockReturnValue([{ inputs }, mockDispatch]);
  useRef.mockReturnValue({ current: [] });
  wrapper = setup();
});

describe("inputs", () => {
  let inputEvent;
  let radioInputs;

  beforeEach(() => {
    inputEvent = {
      target: {
        value: 1,
        name: "role",
      },
    };
    radioInputs = wrapper.find("input", { "data-test": "role" });
  });

  test("should render two radio inputs and `no` is checked", () => {
    expect(radioInputs.length).toBe(2);
    expect(radioInputs.get(1).props.checked).toBeTruthy();
    expect(radioInputs.get(0).props.checked).toBeFalsy();
  });

  test("should dispatch with right values with input 1", () => {
    radioInputs.at(1).simulate("change", inputEvent);
    expect(mockDispatch).toBeCalledWith({
      name: "role",
      type: "SET_INPUT",
      value: 1,
      error: "",
    });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test("should dispatch with right values with input 2", () => {
    inputEvent.target.value = 2;
    radioInputs.at(0).simulate("change", inputEvent);
    expect(mockDispatch).toBeCalledWith({
      name: "role",
      type: "SET_INPUT",
      value: 2,
      error: "",
    });
    expect(mockDispatch).toBeCalledTimes(1);
  });
});

describe("selects", () => {
  let event;
  let professionSelect;
  let experienceSelect;
  beforeEach(() => {
    event = {
      target: {
        name: "profession",
        value: "",
      },
    };
    professionSelect = wrapper.find({ "data-test": "profession" });
    experienceSelect = wrapper.find({ "data-test": "experience" });
  });

  test("should render two select", () => {
    expect(professionSelect.length).toBe(1);
    expect(experienceSelect.length).toBe(1);
  });

  test("should not show selects by default", () => {
    const selectsWrapper = wrapper.find({ "data-test": "select_wrapper" });
    expect(selectsWrapper.length).toBe(2);
    let classes = selectsWrapper.get(0).props.className.split(" ");
    expect(classes).toHaveLength(1);
    expect(classes).not.toContain("show");
  });

  test("should dispatch with right value with profession", () => {
    event.target.value = "banker";
    professionSelect.simulate("change", event);
    expect(mockDispatch).toBeCalledWith({
      name: "profession",
      type: "SET_INPUT",
      value: "banker",
      error: "",
    });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test("should dispatch with right value with experience", () => {
    event.target.name = "experience";
    event.target.value = "banker";
    experienceSelect.simulate("change", event);
    expect(mockDispatch).toBeCalledWith({
      name: "experience",
      type: "SET_INPUT",
      value: "banker",
      error: "",
    });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test("should set error when blur and input empty", () => {
    professionSelect.simulate("blur");
    expect(mockDispatch).toBeCalledWith({
      name: "profession",
      type: "SET_INPUT",
      value: "",
      error: "this field is required",
    });
  });
});

describe("changePage", () => {
  let buttons;
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ changePage: mockChangePage });
    buttons = wrapper.find("button");
  });

  test("should render two buttons on the page", () => {
    expect(buttons).toHaveLength(2);
  });

  test("should move to next page when selected with role 1", () => {
    buttons.at(1).simulate("click");
    expect(mockChangePage).toBeCalled();
  });

  test("should move to next page when selected 1 and errors", () => {
    inputs[1].error = "some error";
    buttons.at(1).simulate("click");
    expect(mockChangePage).toBeCalled();
  });

  test("should move to next page with role 2", () => {
    inputs[1].value = "val 1";
    inputs[2].value = "val 2";
    inputs[0].value = 2;
    buttons.at(1).simulate("click");
    expect(mockChangePage).toBeCalled();
  });

  test("should not move page when role is 2 and the values empty", () => {
    inputs[1].value = "";
    inputs[2].value = "";
    inputs[0].value = 2;
    buttons.at(1).simulate("click");
    expect(mockChangePage).not.toBeCalled();
  });

  test("should not move page when role is 2 with errors", () => {
    inputs[1].value = "some value";
    inputs[1].error = "some error";
    inputs[0].value = 2;
    buttons.at(1).simulate("click");
    expect(mockChangePage).not.toBeCalled();
  });
});

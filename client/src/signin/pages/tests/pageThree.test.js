import { mount } from "enzyme";
import PageThree from "../PageThree";
import React from "react";

const setup = (props = {}) => {
  return mount(<PageThree {...props} />);
};

let inputEvent;
let originalUseReducer;
let mockDispatch = jest.fn();
let wrapper;
let radioInputs;
let professionSelect;
let experienceSelect;
beforeEach(() => {
  inputEvent = {
    target: {
      value: "2",
      name: "role",
    },
  };
  originalUseReducer = React.useReducer;
  React.useReducer = jest.fn(() => [{
      inputs: [
          {name: 'role', value : 1}
        ]}, mockDispatch]);
  wrapper = setup();
  radioInputs = wrapper.find("input", { "data-test": "role" });
  professionSelect = wrapper.find({ "data-test": "profession" });
  experienceSelect = wrapper.find({ "data-test": "experience" });
});

afterEach(() => {
  React.useReducer = originalUseReducer;
});

describe("inputs", () => {
  test("should render two radio inputs and `no` is checked", () => {
    expect(radioInputs.length).toBe(2);
    expect(radioInputs.get(1).props.checked).toBeTruthy();
    expect(radioInputs.get(0).props.checked).toBeFalsy();
  });

  test("should dispatch with right values", () => {
    radioInputs.at(0).simulate("change");
    expect(mockDispatch).toBeCalledWith({
      name: "role",
      type: "SET_INPUT",
      value: "2",
    });

    radioInputs.at(1).simulate("change");
    expect(mockDispatch).toBeCalledWith({
      name: "role",
      type: "SET_INPUT",
      value: "1",
    });
  });

  test("should render two select", () => {
    expect(professionSelect.length).toBe(1);
    expect(experienceSelect.length).toBe(1);
  });

  


});

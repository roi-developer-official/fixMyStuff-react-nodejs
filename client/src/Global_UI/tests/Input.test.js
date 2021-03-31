import { shallow } from "enzyme";
import { Input } from "../Input";
import React from "react";

const props = {
  inputType:"text",
  label: "First name",
  type: "text",
  name: "firstName",
  value: "",
  validate: true,
  validations: {
    required: true,
    minLength: 2,
    alphaNumeric: true,
  },
  error: "",
};

const setup = (props = {}, custom) => {
  const finalProps = { ...props, ...custom };
  return shallow(<Input {...finalProps} />);
};

describe("input", () => {
  const input  = { error: '', value: ''};
  const mockState = jest.fn();

  const mockUpdateInput = jest.fn();
  const mockUpdateError = jest.fn();
  let originalUsState;
  let wrapper;
  const event = {
    target: {
      value: "a",
      name: "firstname",
    },
  };

  beforeEach(() => {
    originalUsState = React.useState;
    React.useState = jest.fn(() => [input, mockState]);
    wrapper = setup(props, { updateInput: mockUpdateInput, updateError: mockUpdateError });
  });

  afterEach(() => {
    React.useState = originalUsState;
  });

  test("renders without error", () => {
    const input = wrapper.find({ name: "firstName" });
    expect(input.length).toBe(1);
  });


  test("update input on change", () => {
    const input = wrapper.find({ name: "firstName" });
    input.simulate("change", event);

    expect(mockState).toBeCalledWith({"value" : "a", "error": ""});
    expect(mockUpdateInput).toBeCalledWith("firstname", "a", "");

  });


  test("update error onblur with wrong input and clears on change", () => {
    const inputEl = wrapper.find({ name: "firstName" });
   
    inputEl.simulate("blur", event);
    expect(mockState).toBeCalledWith({"error": "this field is required", "value": ""});
    expect(mockUpdateInput).toBeCalledWith("firstname", "", "this field is required");

    inputEl.simulate('change', event);
    expect(mockState).toBeCalledWith({"error": "", "value": "a"});
    expect(mockUpdateInput).toBeCalledWith("firstname", "a", "");

  });

});

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
    React.useState = jest.fn(() => [{ error: "", value: "" }, mockState]);
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

    expect(mockUpdateInput).toBeCalledWith("firstname", "a");
    expect(mockState).toBeCalledWith({"value" : "a", "error": ""});

  });


  test("update error onblur with wrong input and clears on change", () => {
    const inputEl = wrapper.find({ name: "firstName" });
    inputEl.simulate("focus");
    inputEl.simulate("blur", event);
    expect(mockState).toBeCalledWith({"error": "this field must be at least 2 chracters", "value": ""});
    expect(mockUpdateError).toBeCalledWith("firstname", "this field must be at least 2 chracters");

    inputEl.simulate('change', event);
    expect(mockState).toBeCalledWith({"error": "", "value": "a"});
    expect(mockUpdateError).toBeCalledWith("firstname", "");

  });


  test("not update error when input is blur with right input", () => {
    const inputEl = wrapper.find({ name: "firstName" });
    event.target.value = "aaaa";
    inputEl.simulate("focus");
    inputEl.simulate("blur", event);
    expect(mockState).not.toBeCalled();
  });



});

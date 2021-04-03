import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import Pageone from "../pages/pageOne";
import { mount } from "enzyme";
import React from "react";
import { Router } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const mockDispatch = jest.fn();
const inputs = {
  page1: [
    { name: "firstName", value: "", error: "" },
    { name: "lastName", value: "", error: "" },
    { name: "city", value: "", error: "" },
  ],
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const setup = (props = {}) => {
  return mount(<Pageone {...props} />);
};

describe("page one", () => {
  beforeEach(() => {
    useSelector.mockReturnValue(inputs);
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  test("number of text inputs is 2", () => {
    const wrapper = setup();
    const inputs = wrapper.find({ inputType: "text" });
    expect(inputs).toHaveLength(2);
  });

  test("number of select input 1", () => {
    const wrapper = setup();
    const inputs = wrapper.find({ inputType: "select" });
    expect(inputs).toHaveLength(1);
  });

  test("number of buttons 2", () => {
    const wrapper = setup();
    const inputs = wrapper.find("Button");
    expect(inputs).toHaveLength(2);
  });

  test("should not be visible when show is false", () => {
    const wrapper = setup({ show: false });
    const wrappingDiv = wrapper.find({ className: "signup_wrapper_page" });
    expect(wrappingDiv).toHaveLength(1);
  });

  test("should be visible when show is true", () => {
    const wrapper = setup({ show: true });
    const wrappingDiv = wrapper.find({ className: "signup_wrapper_page show" });
    expect(wrappingDiv).toHaveLength(1);
  });

  describe("inputs and selects", () => {
    test("dispatch on input change", () => {
      const wrapper = setup();
      const input = wrapper.find({ "data-test": "firstName" });
      input.simulate("change", {
        target: { name: "firstName", value: "h", error: "" },
      });

      expect(mockDispatch).toBeCalledWith({
        name: "firstName",
        type: "AUTH_SIGN_SET_INPUT",
        value: "h",
        error: "",
        page: "page1"
      });
    });
  });

  describe("change page", () => {
    const mockChangePage = jest.fn();

    test("wont change the page when the input are not valid", () => {
      const wrapper = setup({ changePage: mockChangePage });
      const nextButton = wrapper.find({ name: "Next" });
      nextButton.simulate("click");
      expect(mockChangePage).not.toBeCalled();
    });

    test("should redirect to / when cancel clicked", () => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <Pageone />
        </Router>
      );
      const backButton = screen.getByRole("button", {
        name: "Cancel",
      });
      userEvent.click(backButton);
      expect(history.location.pathname).toBe("/");
    });
  });
});

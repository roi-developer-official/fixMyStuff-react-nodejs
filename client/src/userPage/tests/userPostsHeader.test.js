import UserPostsHeader from "../userPostsHeader";
import { mount } from "enzyme";
import { useState } from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const mockSetState = jest.fn();
const mockToggleDeleteInputs = jest.fn();
const mockDeleteButtonState = jest.fn();
const mockSetOrderValue = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
const state = {
  activeIndex: 0,
  showSortOpt: false,
};
const initalProps = {
  toggleDeleteInputs: mockToggleDeleteInputs,
  deleteButtonState: mockDeleteButtonState,
  setOrderValue: mockSetOrderValue,
};
const history = createMemoryHistory();
const setup = (props = initalProps) => {
  return mount(
    <Router history={history}>
      <UserPostsHeader {...props} />
    </Router>
  );
};

beforeEach(() => {
  useState.mockReturnValue([state, mockSetState]);
});

test("should render without error", () => {
  const wrapper = setup();
  const buttons = wrapper.find("button");
  expect(buttons).toHaveLength(3);
});

test("should toggle sort on button click", () => {
  const wrapper = setup();
  const sortButton = wrapper.find({ label: "Sort" });
  sortButton.simulate("click");
  expect(mockSetState).toBeCalledWith({ activeIndex: 0, showSortOpt: true });
});

test("should show sort menu", () => {
  state.showSortOpt = true;
  const wrapper = setup();
  const sortWrapper = wrapper.find({ className: "userp_sort_opt_wrapper" });
  const divs =  sortWrapper.find("div");
  expect(sortWrapper).toHaveLength(1);
  expect(divs).toHaveLength(8);
  state.showSortOpt = false;
});

test("should redurect to create post on new clicked", () => {
  const wrapper = setup();
  const newButton = wrapper.find({ label: "New" });
  newButton.simulate("click");
  expect(history.location.pathname).toBe("/Create-post");
});



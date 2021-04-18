import UserPostsHeader from "../userPostsHeader";
import { mount } from "enzyme";
import { useState } from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { storeFactory } from "../../tests/testUtils";
import { Provider } from "react-redux";

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
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <UserPostsHeader {...props} />
      </Router>
    </Provider>
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

test("should show sort on button click", () => {
  const wrapper = setup();
  const sortButton = wrapper.find({ label: "Sort" });
  sortButton.simulate("click");
  expect(mockSetState).toBeCalledWith({ activeIndex: 0, showSortOpt: true });
});

test("should render an img on the active index div", ()=>{
  state.showSortOpt = true;
  state.activeIndex = 1;
  const wrapper = setup();
  const sortDivs = wrapper.find({className : "userp_sort_opt_text" });  
  expect(sortDivs.at(0).find("img")).toHaveLength(0);
  expect(sortDivs.at(1).find("img")).toHaveLength(1);
});

test("should show sort menu", () => {
  state.showSortOpt = true;
  const wrapper = setup();
  const sortWrapper = wrapper.find({ className: "userp_sort_opt_wrapper" });
  const divs = sortWrapper.find("div");
  expect(sortWrapper).toHaveLength(1);
  expect(divs).toHaveLength(8);
  state.showSortOpt = false;
});

test("should redirect to create post on new clicked", () => {
  const wrapper = setup();
  const newButton = wrapper.find({ label: "New" });
  newButton.simulate("click");
  expect(history.location.pathname).toBe("/Single-post");
});



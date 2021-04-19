import { mount } from "enzyme";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, useParams } from "react-router";
import SinglePost from "../SinglePost";
import { createMemoryHistory } from "history";
import { getSinglePost, addPost, editPost } from "../../actions/postAction";
const history = createMemoryHistory();
let currentStep = 1;
let initalState = {
  loading: false,
  addPostError: null,
  success: false,
  addPostInputs: {
    page1: [
      {
        value: "",
        error: "",
        label: "What happend? (few words)",
        type: "text",
        name: "title",
        validations: {
          required: true,
        },
      },
      {
        label: "wow much you willing to pay for it",
        type: "number",
        name: "maxPayment",
        error: "",
        value: 0,
        min: 0,
        className: "addpost_number_input",
        validations: {
          numeric: true,
          min: 0,
        },
      },
      {
        label: "Add detailed description",
        name: "description",
        cols: 30,
        rows: 5,
        value: "",
        error: "",
      },
    ],
    page2: [{ name: "image", value: "" }],
  },
};
let postId = 51;

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

jest.mock("../../actions/postAction", () => ({
  ...jest.requireActual("../../actions/postAction"),
  getSinglePost: jest.fn(),
  addPost: jest.fn(),
  editPost: jest.fn(),
}));

function pushHistory(edit) {
  history.push(`/single-post/?edit=${edit}`);
}

const setup = () => {
  return mount(
    <Router history={history}>
      <SinglePost />
    </Router>
  );
};
let mockSetState = jest.fn((step) => (currentStep = step));
beforeEach(() => {
  useParams.mockReturnValue({ id: postId });
  useState.mockReturnValue([currentStep, mockSetState]);
  useDispatch.mockReturnValue(() => {});
  useSelector.mockReturnValue(initalState);
});

afterEach(() => {
  getSinglePost.mockClear();
  editPost.mockClear();
  addPost.mockClear();
});

test("should render without errors and dispatch", () => {
  setup();
  pushHistory(false);
  expect(getSinglePost).not.toBeCalled();
});

test("should dispatch getSinglePost with the id", () => {
  setup();
  pushHistory(true);
  expect(getSinglePost).toBeCalledTimes(1);
  expect(getSinglePost).toBeCalledWith(51);
});

test("should dispatch addPost in non edit mode", () => {
  const wrapper = setup();
  pushHistory(false);
  const doneButton = wrapper.find({ "data-test": "button-done" });
  doneButton.simulate("click");
  expect(addPost).toBeCalled();
  expect(editPost).not.toBeCalled();
});

test("should dispatch editPost in edit mode", () => {
  const wrapper = setup();
  pushHistory(true);
  const doneButton = wrapper.find({ "data-test": "button-done" });
  doneButton.simulate("click");
  expect(editPost).toBeCalled();
  expect(addPost).not.toBeCalled();
});

test("should increment and decrement current step", () => {
  const wrapper = setup();
  let nextButton = wrapper.find({ "data-test": "button-next" });
  nextButton.simulate("click");
  expect(mockSetState).toBeCalledWith(2);
  let backButton = wrapper.find({ "data-test": "button-back" });
  backButton.simulate("click");
  expect(mockSetState).toBeCalledWith(0);
});


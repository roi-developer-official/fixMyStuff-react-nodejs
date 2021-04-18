import { mount } from "enzyme";
import { useSelector, useDispatch } from "react-redux";
import SinglePost from "../SinglePost";
import { createMemoryHistory } from "history";
import { getSinglePost } from "../../actions/postAction";
import { Router } from "react-router-dom";

const state = {
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

jest.mock("../../actions/postAction", () => ({
  ...jest.requireActual("../../actions/postAction"),
  getSinglePost: jest.fn((id) => id),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

let history = createMemoryHistory();
const setup = () => {
  return mount(
    <Router history={history}>
      <SinglePost />
    </Router>
  );
};

beforeEach(() => {
  useSelector.mockReturnValue(state);
  getSinglePost.mockImplementation((id) => id );
  useDispatch.mockReturnValue((id) => {
    getSinglePost(id);
  });
});

test("should render without errors", () => {
  const wrapper = setup();
  expect(getSinglePost).toBeCalledWith({ type: "POST_RESET_STATE" });
});

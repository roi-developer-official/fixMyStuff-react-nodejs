import { mount } from "enzyme";
import PageOne from "../pages/pageOne";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { useReducer } from "react";
let history;
let mockReducer = jest.fn();
const mockChangePage = jest.fn();
let mockState = {
  inputs: [
    { name: "title", value: "", error: "" },
    { name: "maxPayment", value: "", error: "" },
  ],
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useReducer: jest.fn(),
}));

beforeEach(() => {
  useReducer.mockReturnValue([mockState, mockReducer]);
});

afterEach(() => {
  mockState.inputs = [
    { name: "title", value: "", error: "" },
    { name: "maxPayment", value: "", error: "" },
  ];
  mockChangePage.mockClear();
});

const setup = (props = {}) => {
  history = createMemoryHistory();
  return mount(
    <Router history={history}>
      <PageOne {...props} />
    </Router>
  );
};

test("should render without errors", () => {
  const wrapper = setup();
  const wrappingDiv = wrapper.find({ className: "add_post_page" });
  expect(wrappingDiv).toHaveLength(1);
});
test("should redirect to /my-page on cancel clicked", () => {
  const wrapper = setup();
  const cancelDiv = wrapper.find({ label: "Cancel" });
  expect(cancelDiv).toHaveLength(1);
  cancelDiv.simulate("click");
  expect(history.location.pathname).toBe("/My-page");
});

test("should not change page when inputs value invalid", () => {
  const wrapper = setup({ changePage: mockChangePage });
  const nextButton = wrapper.find({label: "Next"});
  expect(nextButton).toHaveLength(1);
  nextButton.simulate("click");
  expect(mockChangePage).not.toBeCalled();
});

test('should not change the page when errors in not null', ()=>{
    const wrapper = setup({ changePage: mockChangePage });
    mockState.inputs[0].value = "valid"
    mockState.inputs[1].value = 12;
    mockState.inputs[0].error = "some error";
    const nextButton = wrapper.find({label: "Next"});
    nextButton.simulate("click");
    expect(mockChangePage).not.toBeCalled();
});

test('should change the page when page have no error', ()=>{
    const wrapper = setup({ changePage: mockChangePage });
    mockState.inputs[0].value = "valid"
    mockState.inputs[1].value = 12;
    const nextButton = wrapper.find({label: "Next"});
    nextButton.simulate("click");
    expect(mockChangePage).toBeCalledTimes(1);
});
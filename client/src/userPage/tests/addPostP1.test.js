import { mount } from "enzyme";
import PageOne from "../pageOne";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { storeFactory } from "../../tests/testUtils";

let history;
const mockChangePage = jest.fn();

const state = {
  loading: false,
  error: null,
  success: false,
  addPostInputs: {
    page1: [
      { name: "title", value: "", error: "" },
      { name: "maxPayment", value: "", error: "" },
      { name: "description", value: "", error: "" },
    ],
    page2: [{ name: "image", value: "" }],
  },
};
let inputs = {
  page1: [
    { name: "title", value: "", error: "" },
    { name: "maxPayment", value: "", error: "" },
    { name: "description", value: "", error: "" },
  ],
  page2: [{ name: "image", value: "" }],
};

describe("add-post", () => {
  history = createMemoryHistory();

  const setup = (props = {}, initalState = { postReducer: { ...state } }) => {
    const store = storeFactory(initalState);
    return mount(
      <Router history={history}>
        <Provider store={store}>
          <PageOne {...props} />
        </Provider>
      </Router>
    );
  };

  afterEach(() => {
    state.addPostInputs = JSON.parse(JSON.stringify(inputs));
    mockChangePage.mockClear();
  });

  describe("page 1", () => {
    test("should render without errors", () => {
      const wrapper = setup({ changePage: mockChangePage });
      const wrappingDiv = wrapper.find({ className: "form_page" });
      expect(wrappingDiv).toHaveLength(1);
    });

    test("should redirect to /my-page on cancel clicked", () => {
      const wrapper = setup();
      const cancelDiv = wrapper.find({ label: "Cancel" });
      expect(cancelDiv).toHaveLength(1);
      cancelDiv.simulate("click");
      expect(history.location.pathname).toBe("/My-page");
    });

    test("should not change the page when errors in not null", () => {
      const wrapper = setup({ changePage: mockChangePage });
      state.addPostInputs.page1[0].value = "valid";
      state.addPostInputs.page1[0].error = "some error";
      state.addPostInputs.page1[1].value = 12;
      const nextButton = wrapper.find({ label: "Next" });
      nextButton.simulate("click");
      expect(mockChangePage).not.toBeCalled();
    });

    test("should change the page when page have no error", () => {
      state.addPostInputs.page1[0].value = "valid";
      state.addPostInputs.page1[1].value = 12;
      const wrapper = setup({ changePage: mockChangePage });
      const nextButton = wrapper.find({ label: "Next" });
      nextButton.simulate("click");
      expect(mockChangePage).toBeCalledTimes(1);
    });
  });
});

import { mount } from "enzyme";
import PageOne from "../pageOne";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { storeFactory } from "../../tests/testUtils";

let history;
const mockChangePage = jest.fn();

const initalProps = {
  show: true,
  inputs: [
    { name: "title", value: "", error: "" },
    { name: "maxPayment", value: "", error: "" },
    { name: "description", value: "", error: "" },
  ],
  changePage: mockChangePage,
};
const state = {
  loading: false,
  error: null,
  success: false,
};


describe("add-post", () => {
  history = createMemoryHistory();

  const setup = (
    props = initalProps,
    initalState = { postReducer: { ...state } }
  ) => {
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
    mockChangePage.mockClear();
  });

  describe("page 1", () => {

    test("should render without errors", () => {
      const wrapper = setup();
      const wrappingDiv = wrapper.find({ className: "form_page show" });
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
      let inputs = JSON.parse(JSON.stringify(initalProps.inputs));
      inputs[0].value = "valid";
      inputs[0].error = "some error";
      inputs[1].value = 12;

      const wrapper = setup({...initalProps, inputs: inputs});
      wrapper.mount();
      const nextButton = wrapper.find({ label: "Next" });
      nextButton.simulate("click");
      expect(mockChangePage).not.toBeCalled();

    });

    test("should change the page when page have no error", () => {
      let inputs = JSON.parse(JSON.stringify(initalProps.inputs));
      inputs[0].value = "valid";
      inputs[1].value = 12;
      const wrapper = setup({ ...initalProps, inputs: inputs });
      const nextButton = wrapper.find({ label: "Next" });
      nextButton.simulate("click");
      expect(mockChangePage).toBeCalledTimes(1);
    });

    
  });
});

import postReducer from "../../../reducers/postReducer";
import { actionTypes } from "../../../actions/postAction";
import { storeFactory } from "../../../tests/testUtils";
const initialState = {
  posts: [],
  loading: false,
  success: false,
  error: null,
  currentPage: 1,
  addPostInputs: [
    { name: "title", value: "", error: "" },
    { name: "maxPayment", value: "", error: "" },
    { name: "description", value: "", error: "" },
    { name: "image", value: "" },
  ],
};

let store;
describe("post reducer", () => {
  beforeEach(() => {
    store = storeFactory();
  });
  afterEach(() => {
    store.dispatch({ type: actionTypes.POST_RESET_STATE });
  });

  test("should increment step", () => {
    store.dispatch({ type: actionTypes.POST_INCREMENT_STEP });
    const newState = store.getState();
    expect(newState.postReducer.currentPage).toBe(2);
  });

  test("should decrement the step", () => {
    store.dispatch({ type: actionTypes.POST_DECREMENT_STEP });
    const newState = store.getState();
    expect(newState.postReducer.currentPage).toBe(0);
  });

  
});

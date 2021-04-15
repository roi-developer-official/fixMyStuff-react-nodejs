import { actionTypes } from "../../../actions/postAction";
import { storeFactory } from "../../../tests/testUtils";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  success: false,
  error: null,
  currentPage: 1,
  addPostInputs: {
    page1: [
      { name: "title", value: "", error: "" },
      { name: "maxPayment", value: "", error: "" },
      { name: "description", value: "", error: "" },
    ],
    page2: [{ name: "image", value: "" }],
  },
};
let store;
describe("post reducer", () => {
  beforeEach(() => {
    store = storeFactory();
  });
  afterEach(() => {
    store.dispatch({ type: actionTypes.POST_RESET_STATE });
  });

  test("should reset state", () => {
    store.dispatch({ type: actionTypes.POST_RESET_STATE });
    const newState = store.getState().postReducer;
    expect(newState).toStrictEqual({
      ...initialState,
      error: null,
      loading: false,
      success: false,
    });
  });

  test("sould add a post to posts array on post created", () => {
    let post = {
      title: "test title",
      maxPayment: 10,
      description: "some description",
      image: null,
    };
    store.dispatch({ type: actionTypes.POST_ADD_SUCCESS, payload: post });
    const newState = store.getState().postReducer;
    expect(newState.posts).toHaveLength(1);
    expect(newState.posts[0]).toStrictEqual(post)
  });

  test("should set inputs currectly", ()=>{
    const store = storeFactory();
    store.dispatch({
      type: actionTypes.POST_ADD_SET_INPUT,
      name: "title",
      value: "abc",
      page:"page1",
      error: "some error"
    });

    const newState = store.getState().postReducer;
    const expectedState = { name: "title", value: "abc", error: "some error" };
    expect(newState.addPostInputs.page1[0]).toEqual(expectedState);
  });

  
});

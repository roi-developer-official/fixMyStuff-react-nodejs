import { actionTypes } from "../../../actions/postAction";
import { storeFactory } from "../../../tests/testUtils";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  success: false,
  deletedPosts: [],
  addPostError: null,
  getPostsError: null,
  deletePostsError: null,
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
let posts = [
  {
    title: "some title",
    id: 1,
  },
  {
    title: "some title 2",
    id: 2,
  },
];
let store;

const setup = (state = initialState) => {
  store = storeFactory({ postReducer: { ...state } });
};
describe("post reducer", () => {
  beforeEach(() => {
    setup();
  });
  afterEach(() => {
    store.dispatch({ type: actionTypes.POST_RESET_STATE });
  });

  test("should reset state", () => {
    store.dispatch({ type: actionTypes.POST_RESET_STATE });
    const newState = store.getState().postReducer;
    expect(newState).toStrictEqual({
      ...initialState,
      addPostError: null,
      deletePostsError: null,
      getPostsError: null,
      deletedPosts: [],
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
    expect(newState.posts[0]).toStrictEqual(post);
  });

  test("should set inputs currectly", () => {
    store.dispatch({
      type: actionTypes.POST_ADD_SET_INPUT,
      name: "title",
      value: "abc",
      page: "page1",
      error: "some error",
    });

    const newState = store.getState().postReducer;
    const expectedState = { name: "title", value: "abc", error: "some error" };
    expect(newState.addPostInputs.page1[0]).toEqual(expectedState);
  });

  test("should handle delete post currectly on success", () => {
    store.dispatch({ type: actionTypes.POST_ADD_DELETE_POST, payload: 1 });
    let newState = store.getState().postReducer;
    expect(newState.deletedPosts).toEqual([1]);
    store.dispatch({ type: actionTypes.POST_ADD_DELETE_POST, payload: 2 });
    newState = store.getState().postReducer;
    expect(newState.deletedPosts).toEqual([1, 2]);
  });

  test("should handle removing deleted post from the array", () => {
    store.dispatch({ type: actionTypes.POST_ADD_DELETE_POST, payload: 1 });
    store.dispatch({ type: actionTypes.POST_REMOVE_DELETE_POST, payload: 1 });
    let newState = store.getState().postReducer;
    expect(newState.deletedPosts).toEqual([]);
  });

  test("should handle removing posts from origin posts array on success", () => {
    let state = {
      ...initialState,
      posts: [...posts],
    };
    setup(state);
    let newState = store.getState().postReducer;
    store.dispatch({
      type: actionTypes.POST_DELETE_POSTS_SUCCESS,
      payload: [1],
    });
    newState = store.getState().postReducer;
    expect(newState.posts).toMatchObject([{ id: 2, title: "some title 2" }]);
  });

  test("should handle removing multiple from posts array on success", () => {
    let state = {
      ...initialState,
      posts: [...posts],
    };
    setup(state);
    store.dispatch({
      type: actionTypes.POST_DELETE_POSTS_SUCCESS,
      payload: [1, 2],
    });
    let newState = store.getState().postReducer;
    expect(newState.posts).toMatchObject([]);
  });
});

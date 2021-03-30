import moxios from "moxios";
import { storeFactory } from "../../../tests/testUtils";
import { signIn } from "../../authAction";

//integration test for async function by that mage requests to the server
const mockCallBack = jest.fn();
jest.mock("../../authAction", () => {
  const originalModule = jest.requireActual("../../authAction");

  return {
    __esModule: true,
    ...originalModule,
    actionFailed: jest.fn(),
    actionSuccess: jest.fn().mockReturnValue(10),
  };
});

describe("signup", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("signup returned with response, and making callback call", () => {
    const store = storeFactory({
      actionReducer: { error: "some error", loading: true },
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    return store.dispatch(signIn({}, mockCallBack)).then(() => {
      expect(mockCallBack).toBeCalledWith("party");
      expect(store.getState().actionReducer).toStrictEqual({
        error: null,
        loading: false,
      });
    });
  });

  test("signup dispatch on error", () => {
    const store = storeFactory({ actionReducer: { error: null, loading: true } });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          error: { message: "oops" },
        },
      });
    });

    return store.dispatch(signIn({}, undefined)).then(() => {
      expect(store.getState().actionReducer).toStrictEqual({
        error: "oops",
        loading: false,
      });
    });
  });
});

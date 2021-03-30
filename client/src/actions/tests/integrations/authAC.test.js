import moxios from "moxios";
import { storeFactory, user } from "../../../tests/testUtils";
import { signIn } from "../../authAction";

//integration test for async function by that mage requests to the server;
describe("signup", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("signup returned with currect response", () => {
    const store = storeFactory({
      authReducer: {
        error: "some error",
        loading: true,
        user: null,
        expiry: null,
      },
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          user: user,
          expiry: "2019",
        },
      });
    });

    return store
      .dispatch(signIn({}))
      .then(() => {
        expect(store.getState().authReducer).toStrictEqual({
          error: null,
          loading: false,
          user: user,
          expiry: "2019",
        });
      });
  });

  test("signup dispatch on error", () => {
    const store = storeFactory({
      authReducer: { 
        error: null, loading: true , user: null, expiry: null
      },
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          error: { message: "oops" },
        },
      });
    });

    return store.dispatch(signIn({})).then(() => {
      expect(store.getState().authReducer).toStrictEqual({
        error: "oops",
        loading: false,
        user: null,
        expiry:null
      });
    });
  });
});


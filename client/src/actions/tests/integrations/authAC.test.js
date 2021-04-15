import moxios from "moxios";
import { storeFactory, user } from "../../../tests/testUtils";
import { signIn } from "../../authAction";

let signInInputs = {
    page1: [
      { name: "firstName", value: "", error: "" },
      { name: "lastName", value: "", error: "" },
      { name: "city", value: "", error: "" },
    ],
    page3: [
      { name: "role", value: 1, error: "" },
      { name: "profession", value: "", error: "" },
      { name: "experience", value: "", error: "" },
    ],
    page4: [
      { name: "email", value: "", error: "" },
      { name: "password", value: "", error: "" },
      { name: "confirmPassword", value: "", error: "" },
    ],
};

describe("signup authAC", () => {
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
        signInInputs: signInInputs
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
      .dispatch(signIn())
      .then(() => {
        expect(store.getState().authReducer).toStrictEqual({
          error: null,
          loading: false,
          user: user,
          expiry: "2019",
          success: true,
          signInInputs: signInInputs
        });
      });
  });

  test("signup dispatch on error", () => {
    const store = storeFactory({
      authReducer: { 
        error: null, loading: true , user: null, expiry: null, signInInputs : signInInputs
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

    return store.dispatch(signIn()).then(() => {
      expect(store.getState().authReducer).toStrictEqual({
        error: "oops",
        loading: false,
        user: null,
        expiry:null,
        success: false,
        signInInputs: signInInputs
      });
    });
  });
});





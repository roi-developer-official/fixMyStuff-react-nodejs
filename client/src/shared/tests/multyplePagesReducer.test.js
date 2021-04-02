import {multyPagesReducer} from '../useReducers/multyplePages';
//unit tests
describe("signin reducer", () => {
    const initialState = {
      currentStep: 1,
      inputs: [
        { name: "firstName", value: "" },
        { name: "lastName", value: "" },
      ],
      signupSuccess: null,
    };
    const inputs = [
      { name: "firstName", value: "bob" },
      { name: "lastName", value: "alice" },
    ];
    test("sohuld increment the step by 1", () => {
      const action = multyPagesReducer(initialState, { type: "INCREMENT_STEP" });
      expect(action).toMatchObject({
        ...initialState,
        currentStep: 2,
      });
    });

    test("should decrement the step by 1", () => {
      const action = multyPagesReducer(initialState, { type: "DECREMENT_STEP" });
      expect(action).toMatchObject({
        ...initialState,
        currentStep: 0,
      });
    });

    test("should update inputs", () => {
      const action = multyPagesReducer(initialState, {
        type: "SET_INPUTS",
        payload: { inputs },
      });
      expect(action).toMatchObject({
        ...initialState,
        inputs: inputs,
      });
    });
  });
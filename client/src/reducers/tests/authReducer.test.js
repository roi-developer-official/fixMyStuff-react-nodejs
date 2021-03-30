import authReducer from "../authReducer";

//strictly testing the reducer
test("when no action is mentioned return the state", () => {
  const newState = authReducer(undefined, {});
  expect(newState).toMatchObject({
    error: null,
    loading: false,
    user:null,
    expiry:null
  });
});

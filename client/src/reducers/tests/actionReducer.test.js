import actionReducer from "../actionReducer";

//strictly testing the reducer
test("when no action is mentioned return the state", () => {
  const newState = actionReducer(undefined, {});
  expect(newState).toMatchObject({
    error: null,
    loading: false,
  });
});

import { actionTypes } from "../../actions/authAction";
import authReducer from "../authReducer";

test("when no action is mentioned return the state", () => {
  const newState = authReducer(undefined, {});
  expect(newState).toMatchObject({
    error: null,
    loading: false,
    token: null,
    user: null,
  });
});



import "./signin.css";
import React, { useEffect } from "react";
import { returnFormData } from "../../shared/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  multyPagesReducer,
  actionTypes,
} from "../../shared/useReducers/multyplePages";
import { FormFeedback, Steps, LoadingSpinner } from "../../Global_UI";
import PageOne from "./pages/pageOne";
import PageTwo from "./pages/pageTwo";
import PageThree from "./pages/pageThree";
import PageFour from "./pages/pageFour";
import { signIn, actionTypes as authActions } from "../../actions/authAction";
import { useHistory } from "react-router";
const steps = [1, 2, 3, 4];

const initialState = {
  currentStep: 1,
  inputs: [
    { name: "firstName", value: "" },
    { name: "lastName", value: "" },
    { name: "city", value: "" },
    { name: "image", value: "" },
    { name: "role", value: "" },
    { name: "profession", value: "" },
    { name: "experience", value: "" },
    { name: "email", value: "" },
    { name: "password", value: "" },
    { name: "confirmPassword", value: "" },
  ],
  signupSuccess: null,
};

export default function SignIn() {
  const { loading, error, success } = useSelector((state) => state.authReducer);
  const storeDispatch = useDispatch();
  const history = useHistory();
  const [state, dispatch] = React.useReducer(multyPagesReducer, initialState);

  useEffect(() => {
    storeDispatch({ type: authActions.RESET_STATE });
  }, [storeDispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push("/");
      }, 700);
    }
  }, [success, history]);

  function moveBetweenPages(label, inputs) {
    switch (label) {
      case "Next":
        dispatch({ type: actionTypes.INCREMENT_STEP });
        dispatch({ type: actionTypes.SET_INPUTS, payload: { inputs } });
        break;
      case "Done":
        dispatch({ type: actionTypes.SET_INPUTS, payload: { inputs } });
        submitPage(state.inputs);
        break;
      case "Back":
        dispatch({ type: actionTypes.DECREMENT_STEP });
        break;
      default:
        return;
    }
  }

  function submitPage(inputs) {
    let reqData = returnFormData(inputs);
    storeDispatch({ type: authActions.ACTION_START });
    storeDispatch(signIn(reqData));
  }

  return (
    <div className="signup_page_container" data-test="component-signin">
      <LoadingSpinner show={loading} />
      <Steps steps={steps} currnetStep={state.currentStep}></Steps>
      <FormFeedback
        error={error}
        message={success ? "Signup Successfuly!" : error}
        success={success}
      />
      <div className="pages_container">
        <PageOne show={state.currentStep === 1} changePage={moveBetweenPages} />
        <PageTwo show={state.currentStep === 2} changePage={moveBetweenPages} />
        <PageThree
          show={state.currentStep === 3}
          changePage={moveBetweenPages}
        ></PageThree>
        <PageFour
          show={state.currentStep === 4}
          changePage={moveBetweenPages}
        ></PageFour>
      </div>
    </div>
  );
}

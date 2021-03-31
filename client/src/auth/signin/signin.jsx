import "./signin.css";
import React, { useEffect, useReducer } from "react";
import { returnFormData } from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { FormFeedback, Steps, LoadingSpinner } from "../../Global_UI";
import PageOne from "./pages/pageOne";
import PageTwo from "./pages/pageTwo";
import PageThree from "./pages/pageThree";
import PageFour from "./pages/pageFour";
import { signIn, actionTypes } from "../../actions/authAction";
const steps = [1, 2, 3, 4];
const INCREMENT_STEP = "INCREMENT_STEP";
const DECREMENT_STEP = "DECREMENT_STEP";
const SET_INPUTS = "SET_INPUTS";
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

export function signInReducer(state, action) {
  switch (action.type) {
    case INCREMENT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case DECREMENT_STEP:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case SET_INPUTS:
      const { inputs } = action.payload;
      let updatedInputs = state.inputs.slice();
      for (let input of inputs) {
        const index = updatedInputs.findIndex(
          (entry) => entry.name === input.name
        );
        updatedInputs[index].value = input.value;
      }
      return {
        ...state,
        inputs: updatedInputs,
      };
    default:
      return state;
  }
}

export default function SignIn() {
  const { loading, error, success } = useSelector((state) => state.authReducer);
  const storeDispatch = useDispatch();
  const [state, dispatch] = React.useReducer(signInReducer, initialState);

  useEffect(() => {
    storeDispatch({ type: actionTypes.RESET_STATE });
  }, [storeDispatch]);

  function moveBetweenPages(label, inputs) {
    switch (label) {
      case "Next":
        dispatch({ type: INCREMENT_STEP });
        dispatch({ type: SET_INPUTS, payload: { inputs } });
        break;
      case "Done":
        dispatch({ type: SET_INPUTS, payload: { inputs } });
        submitPage(state.inputs);
        break;
      case "Back":
        dispatch({ type: DECREMENT_STEP });
        break;
      default:
        return;
    }
  }

  function submitPage(inputs) {
    let reqData = returnFormData(inputs);
    storeDispatch({ type: actionTypes.ACTION_START });
    storeDispatch(signIn(reqData));
  }

  return (
    <div className="signup_page_container" data-test="component-signin">
      <LoadingSpinner show={loading}/>
      <Steps steps={steps} currnetStep={state.currentStep}></Steps>
      <FormFeedback error={error} message={success ? "Signup Successfuly!" : "Signup Failed!"} success={success}/>
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

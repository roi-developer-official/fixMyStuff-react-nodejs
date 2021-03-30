import React, { useEffect, useState } from "react";
import { Steps, FormFeedback } from "../Global_UI";
import PageOne from "./pages/pageOne";
import "./signin.css";
import PageTwo from "./pages/pageTwo";
import PageThree from "./pages/pageThree";
import PageFour from "./pages/pageFour";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../reducers/actionReducer";
import { signIn } from "../actions/authAction";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router";
const steps = [1, 2, 3, 4];

export default function SignIn() {
  const context = React.useContext(AuthContext);
  const [state, setState] = useState({
    currentStep: 1,
    inputsValues: new Map(),
    signupSuccess: null,
  });

  const { loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: actionTypes.RESET_STATE });
  }, [dispatch]);

  function moveBetweenPages(label, inputs) {
    let currentStep;
    switch (label) {
      case "Next":
        currentStep = state.currentStep + 1;
        updateInputOnPageSubmitted(inputs);
        setState({
          ...state,
          currentStep: currentStep,
        });
        break;
      case "Done":
        updateInputOnPageSubmitted(inputs);
        submitPage();
        break;
      case "Back":
        currentStep = state.currentStep - 1;
        setState({
          ...state,
          currentStep: currentStep,
        });
        break;
      default:
        return;
    }
  }

  function updateInputOnPageSubmitted(inputs) {
    for (let key in Object.keys(inputs)) {
      if (key !== "conifirm password")
        setState({
          ...state,
          inputsValues: state.inputsValues.set(
            inputs[key].name,
            inputs[key].value
          ),
        });
    }
  }

  function submitPage() {
    let reqData = new FormData();
    state.inputsValues.forEach((key, value) => {
      reqData.append(value, key);
    });

    dispatch({ type: actionTypes.ACTION_START });
    dispatch(signIn(reqData, signupSuccess));
  }

  function signupSuccess(result) {
    setState({
      ...state,
      signupSuccess: true,
    });

    setTimeout(() => {
      context.setAuthState(result);
      history.push("/");
    }, 700);
  }

  function returnCustomFeedback() {
    if (error) {
      return <FormFeedback error={true} message={error}></FormFeedback>;
    } else if (state.signupSuccess) {
      return (
        <FormFeedback
          error={false}
          message={"Signup Succesfully!"}
        ></FormFeedback>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="signup_page_container" data-test="component-signin">
      {loading && <div className="loader"></div>}
      <Steps steps={steps} currnetStep={state.currentStep}></Steps>
      {returnCustomFeedback()}
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

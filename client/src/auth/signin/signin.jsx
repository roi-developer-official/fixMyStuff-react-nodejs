import "./signin.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormFeedback, Steps, LoadingSpinner } from "../../Global_UI";
import PageOne from "./pages/pageOne";
import PageThree from "./pages/pageThree";
import PageFour from "./pages/pageFour";
import { signIn, actionTypes } from "../../actions/authAction";
import { useHistory } from "react-router";
import AddImagePage from "../../Global_UI/addImagePage";
const steps = [1, 2, 3, 4];

export default function SignIn() {
  const { loading, error, success, currentStep } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: actionTypes.RESET_STATE });
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push("/");
      }, 700);
    }
  }, [success, history]);

  function moveBetweenPages(label) {
    switch (label) {
      case "Next":
        dispatch({ type: actionTypes.INCREMENT_STEP });
        break;
      case "Done":
        dispatch({ type: actionTypes.ACTION_START });
        dispatch(signIn());
        break;
      case "Back":
        dispatch({ type: actionTypes.DECREMENT_STEP });
        break;
      default:
        return;
    }
  }

  return (
    <div className="signup_page_container" data-test="component-signin">
      <LoadingSpinner show={loading} />
      <Steps steps={steps} currnetStep={currentStep}></Steps>
      <FormFeedback
        error={error}
        message={success ? "Signup Successfuly!" : error}
        success={success}
      />
      <div className="pages_container">
        <PageOne show={currentStep === 1} changePage={moveBetweenPages} />
        <AddImagePage show={currentStep === 2} changePage={moveBetweenPages} />
        <PageThree
          show={currentStep === 3}
          changePage={moveBetweenPages}
        ></PageThree>
        <PageFour
          show={currentStep === 4}
          changePage={moveBetweenPages}
        ></PageFour>
      </div>
    </div>
  );
}

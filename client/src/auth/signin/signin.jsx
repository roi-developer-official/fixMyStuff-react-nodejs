import React, { useEffect, useRef, useState } from "react";
import { buttons as page2Buttons } from "./elements";
import { useDispatch, useSelector } from "react-redux";
import {
  FormFeedback,
  Steps,
  LoadingSpinner,
  AddImagePage,
  PagesContainer,
} from "../../Global_UI";
import PageOne from "./pageOne";
import PageThree from "./pageThree";
import PageFour from "./pageFour";
import { signIn, actionTypes } from "../../actions/authAction";
import { useHistory } from "react-router";
const steps = [1, 2, 3, 4];

export default function SignIn() {
  const { loading, error, success } = useSelector((state) => state.authReducer);
  const [currentStep, setCurrentStep] = useState(1);
  const timerId = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: actionTypes.AUTH_RESET_STATE });
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      timerId.current = setTimeout(() => {
        dispatch({ type: actionTypes.AUTH_RESET_STATE });
        history.push("/");
      }, 700);
    } else {
      clearTimeout(timerId.current);
    }
  }, [success, history, dispatch]);

  function moveBetweenPages(label, input) {
    switch (label) {
      case "Next":
        if (input)
          dispatch({
            type: actionTypes.AUTH_SIGN_SET_INPUT,
            page: "page2",
            name: input.name,
            value: input.value,
          });
        setCurrentStep(currentStep + 1);

        break;
      case "Done":
        dispatch({ type: actionTypes.AUTH_ACTION_START });
        dispatch(signIn());
        break;
      case "Back":
        setCurrentStep(currentStep - 1);
        break;
      default:
        return;
    }
  }

  return (
    <>
      <LoadingSpinner show={loading} />
      <Steps steps={steps} currnetStep={currentStep}></Steps>
      <FormFeedback
        error={error}
        message={success ? "Signup Successfuly!" : error}
        success={success}
      />
      <PagesContainer>
        <PageOne show={currentStep === 1} changePage={moveBetweenPages} />
        <AddImagePage
          show={currentStep === 2}
          changePage={moveBetweenPages}
          buttons={page2Buttons.page3}
        />
        <PageThree
          show={currentStep === 3}
          changePage={moveBetweenPages}
        ></PageThree>
        <PageFour
          show={currentStep === 4}
          changePage={moveBetweenPages}
        ></PageFour>
      </PagesContainer>
    </>
  );
}

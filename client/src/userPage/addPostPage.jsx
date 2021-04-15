import {
  Steps,
  FormFeedback,
  LoadingSpinner,
  AddImagePage,
  PagesContainer,
} from "../Global_UI";
import { useAuth } from "../hooks/useAuth";
import { buttons as page2Buttons } from "./elements";
import { useHistory } from "react-router";
import PageOne from "./pageOne";
import { useDispatch, useSelector } from "react-redux";
import { addPost, actionTypes } from "../actions/postAction";
import { useEffect, useRef, useState } from "react";

function AddPostPage() {
  const history = useHistory();
  const user = useAuth()[0];
  const { loading, error, success } = useSelector((state) => state.postReducer);

  const [currentStep, setCurrentStap] = useState(1);
  const dispatch = useDispatch();
  const timerId = useRef();

  useEffect(() => {
    if (success) {
      timerId.current = setTimeout(() => {
        history.push("/My-page");
      }, 700);
    } else {
      clearTimeout(timerId.current);
    }
  }, [success, history, dispatch]);

  useEffect(() => {
    dispatch({ type: actionTypes.POST_RESET_STATE });
    return () => dispatch({ type: actionTypes.POST_RESET_STATE });
  }, [dispatch]);

  function moveBetweenPages(label, input) {
    switch (label) {
      case "Next":
        setCurrentStap(currentStep + 1);
        break;
      case "Done":
        dispatch({
          type: actionTypes.POST_ADD_SET_INPUT,
          name: input.name,
          value: input.value,
          page: "page2",
        });
        dispatch({ type: actionTypes.POST_ACTION_START });
        dispatch(addPost(user.email));
        break;
      case "Back":
        setCurrentStap(currentStep - 1);
        break;
      default:
        return;
    }
  }

  return (
    <>
      <LoadingSpinner show={loading} />
      <Steps currnetStep={currentStep} steps={[1, 2]}></Steps>
      <FormFeedback
        error={error}
        message={success ? "Post Created Successfully!" : error}
        success={success}
      />
      <PagesContainer>
        <PageOne show={currentStep === 1} changePage={moveBetweenPages} />
        <AddImagePage
          show={currentStep === 2}
          changePage={moveBetweenPages}
          buttons={page2Buttons.page2}
        />
      </PagesContainer>
    </>
  );
}

export default AddPostPage;

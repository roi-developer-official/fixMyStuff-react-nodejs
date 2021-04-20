import {
  Steps,
  FormFeedback,
  LoadingSpinner,
  AddImagePage,
  PagesContainer,
} from "../Global_UI";
import { buttons as page2Buttons } from "./elements";
import { useHistory, useParams, useLocation } from "react-router";
import PageOne from "./pageOne";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  actionTypes,
  getSinglePost,
  editPost,
} from "../actions/postAction";
import { useEffect, useRef, useState } from "react";

function SinglePost() {
  const history = useHistory();
  const {
    loading,
    addPostError: error,
    success,
    addPostInputs: inputs,
  } = useSelector((state) => state.postReducer);
  const [currentStep, setCurrentStap] = useState(1);
  const dispatch = useDispatch();
  const timerId = useRef();
  let id = useParams().id;
  let isEditMode =  new URLSearchParams(useLocation().search).get("edit") === "true";

  useEffect(() => {
    if (isEditMode) {
      dispatch(getSinglePost(id));
    }else {
     
    }
  }, [isEditMode,id, dispatch]);

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
        });
        dispatch({ type: actionTypes.POST_ACTION_START });
        if (isEditMode) {
          dispatch(editPost(id));
        } else {
          dispatch(addPost());
        }
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
        message={success ? success : error}
        success={success}
      />
      <PagesContainer>
        <PageOne
          inputs={inputs.page1}
          show={currentStep === 1}
          changePage={moveBetweenPages}
        />
        <AddImagePage
          imageSrc={inputs.page2[0].value}
          show={currentStep === 2}
          changePage={moveBetweenPages}
          buttons={page2Buttons.page2}
        />
      </PagesContainer>
    </>
  );
}

export default SinglePost;

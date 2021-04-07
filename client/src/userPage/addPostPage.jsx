import { Steps, FormFeedback, LoadingSpinner, AddImagePage } from "../Global_UI";
import { buttons as page2Buttons } from "./elements";
import "./addPostPage.css";
import { useHistory } from "react-router";
import PageOne from "./pageOne";
import { useDispatch, useSelector } from "react-redux";
import { addPost, actionTypes } from "../actions/postAction";
import { useEffect, useRef } from "react";

function AddPostPage() {
  const history = useHistory();
  const { loading, error, success, currentPage } = useSelector(
    (state) => state.postReducer
  );
  const dispatch = useDispatch();
  const timerId = useRef();

  useEffect(()=>{
    if(success){
      timerId.current = setTimeout(()=>{
        dispatch({type: actionTypes.POST_RESET_STATE});
        history.push("/My-page")
      },700);
    } else {
      clearTimeout(timerId.current);
    }
  },[success, history,dispatch]);

  function moveBetweenPages(label, input) {
    switch (label) {
      case "Next":
        dispatch({ type: actionTypes.POST_INCREMENT_STEP });
        break;
      case "Done":
        dispatch({
          type: actionTypes.ADD_POST_SET_INPUT,
          name: input.name,
          value: input.value,
        });
        dispatch({ type: actionTypes.POST_ACTION_START });
        dispatch(addPost());
        break;
      case "Back":
        dispatch({ type: actionTypes.POST_DECREMENT_STEP });
        break;
      default:
        return;
    }
  }

  return (
    <div className="add_post_page_wrapper">
      <LoadingSpinner show={loading} />
      <Steps currnetStep={currentPage} steps={[1, 2]}></Steps>
      <FormFeedback
        error={error}
        message={success ? "Signup Successfuly!" : error}
        success={success}
      />
      <div className="pages_container">
        <PageOne show={currentPage === 1} changePage={moveBetweenPages} />
        <AddImagePage
          show={currentPage === 2}
          changePage={moveBetweenPages}
          buttons={page2Buttons.page2}
        />
      </div>
    </div>
  );
}

export default AddPostPage;
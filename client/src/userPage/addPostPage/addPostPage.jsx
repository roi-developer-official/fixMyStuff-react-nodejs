import { useReducer } from "react";
import { Steps, FormFeedback, LoadingSpinner } from "../../Global_UI";
import { returnFormData } from "../../shared/functions";
import "./addPostPage.css";
import { useHistory } from "react-router";
import PageOne from "./pages/pageOne";
import PageTwo from "./pages/pageTwo";
import { useDispatch, useSelector } from "react-redux";
import { addPost , actionTypes as postActions} from "../../actions/postAction";
import {
  multyPagesReducer,
  actionTypes,
} from "../../shared/useReducers/multyplePages";

let initialState = {
  currentPage: 1,
  inputs: [
    { name: "title", value: "" },
    { name: "image", value: "" },
    { name: "description", value: "" },
    { name: "maxPayment", value: "" },
],
};

function AddPostPage() {
  const history = useHistory();
  const [state, dispatch] = useReducer(multyPagesReducer, initialState);
  const { loading, error, success } = useSelector((state) => state.postReducer);
  const storeDispatch = useDispatch();

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
    storeDispatch({ type: postActions.ACTION_START });
    storeDispatch(addPost(reqData));
  }

  return (
    <div className="add_post_page_wrapper">
      <LoadingSpinner show={loading} />
      <Steps currnetStep={state.currentPage} steps={[1, 2]}></Steps>
      <FormFeedback
        error={error}
        message={success ? "Signup Successfuly!" : error}
        success={success}
      />
      <div className="pages_container">
        <PageOne show={state.currentPage === 1} changePage={moveBetweenPages} />
        <PageTwo show={state.currentPage === 2} changePage={moveBetweenPages} />
      </div>
    </div>
  );
}

export default AddPostPage;

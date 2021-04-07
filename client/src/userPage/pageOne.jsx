import {
  buttons as pageButtons,
  inputs as pageInputs,
  textAreas as ta,
} from "./elements";
import { actionTypes } from "../actions/postAction";
import { addToRefsArray } from "../shared";
import { Textarea, Logo, Inputs, Buttons, FormPage } from "../Global_UI";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PageOne({ show, changePage }) {
  const history = useHistory();
  const refs = useRef([]);
  const { page1: inputs } = useSelector(
    (state) => state.postReducer.addPostInputs
  );
  const dispatch = useDispatch();

  function onInputChange(name, value, error) {
    dispatch({ type: actionTypes.POST_ADD_SET_INPUT, name, value, error, page: "page1" });
  }

  function onButtonClicked(label) {
    if (label === "Cancel") history.push("/My-page");
    else {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].error.length > 0 || inputs[i].value.length === 0) {
          refs.current[i].focus();
          return;
        }
      }
      changePage(label);
    }
  }

  return (
    <FormPage show={show}>
      <div className="logo_header">
        <Logo></Logo>
      </div>
      <Inputs
        inputs={pageInputs.page1}
        onChange={onInputChange}
        refs={refs}
        className="form_input_wrapper"
      />
      <Textarea
        key={ta.name}
        label={ta.label}
        rows={ta.rows}
        cols={ta.cols}
        updateInput={onInputChange}
        name={ta.name}
        addToRefsArray={(el) => addToRefsArray(el, refs)}
        validations={ta.validations}
      ></Textarea>
      <Buttons
        buttons={pageButtons.page1}
        onClick={onButtonClicked}
        className="form_buttons_wrapper"
      />
      </FormPage>
  );
}

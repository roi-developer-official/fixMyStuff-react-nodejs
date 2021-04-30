import { Logo, Buttons, Inputs, FormPage } from "../../Global_UI";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  buttons as pageButtons,
} from "./elements";
import { actionTypes } from "../../actions/authAction";
import { useDispatch } from "react-redux";

function PageOne({ changePage, show , inputs }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const refs = useRef([]);


  function onButtonClick(action) {
    if (action === "Cancel") {
      history.push("/");
    } else if (action === "Next") {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].error.length > 0 || inputs[i].value.length === 0) {
          refs.current[i].focus();
          return;
        }
      }
      changePage(action);
    }
  }

  function onInputChange(name, value, error) {
    dispatch({
      type: actionTypes.AUTH_SIGN_SET_INPUT,
      name: name,
      value: value,
      error: error,
    });
  }

  return (
    <FormPage show={show}>
      <div className="logo_header">
        <Logo></Logo>
      </div>
      <Inputs
        inputs={inputs}
        onChange={onInputChange}
        refs={refs}
        className="form_input_wrapper"
      />
      <Buttons
        className="form_buttons_wrapper"
        buttons={pageButtons.page1}
        onClick={onButtonClick}
      />
    </FormPage>
  );
}
export default PageOne;

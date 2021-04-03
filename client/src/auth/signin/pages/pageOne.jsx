import { Button, Input, Logo } from "../../../Global_UI";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  buttons as pageButtons,
  inputs as pageInputs,
  selects as pageSelects,
  citiesString,
} from "./elements";
import { addToRefsArray } from "../../../shared";
import { actionTypes } from "../../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";

function PageOne({ changePage, show }) {
  const cities = citiesString.split(",");
  const history = useHistory();
  const { page1: inputs } = useSelector(
    (state) => state.authReducer.signInInputs
  );
  const dispatch = useDispatch();
  const refs = useRef([]);

  useEffect(() => {
    dispatch({ type: actionTypes.INCREMENT_STEP });
  }, [dispatch]);

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
      type: actionTypes.SIGN_SET_INPUT,
      name: name,
      value: value,
      error: error,
      page: "page1",
    });
  }

  return (
    <div className={`signup_wrapper_page${show ? " show" : ""}`}>
      <div className="logo_header">
        <Logo></Logo>
      </div>
      {pageInputs.page1.map((input, i) => {
        return (
          <div key={i} className="form_input_wrapper">
            <Input
              inputType={input.type}
              label={input.label}
              name={input.name}
              updateInput={onInputChange}
              addToRefsArray={(el) => addToRefsArray(el, refs)}
              validations={input.validations}
            ></Input>
          </div>
        );
      })}
      {pageSelects.page1.map((input) => {
        return (
          <div key={input.name} className="form_select_wrapper show">
            <Input
              inputType={input.type}
              label={input.label}
              validations={input.validations}
              name={input.name}
              options={cities}
              updateInput={onInputChange}
              addToRefsArray={(el) => addToRefsArray(el, refs)}
            />
          </div>
        );
      })}
      <div className="form_buttons_wrapper">
        {pageButtons.page1.map((btn, i) => {
          return (
            <Button
              key={i}
              label={btn.label}
              onClick={onButtonClick}
              style={btn.style}
            ></Button>
          );
        })}
      </div>
    </div>
  );
}
export default PageOne;

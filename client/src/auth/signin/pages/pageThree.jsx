import React from "react";
import { Input, Buttons } from "../../../Global_UI";
import {
  inputs as pageInputs,
  buttons as pageButtons,
  selects as pageSelects,
} from "./elements";
import { addToRefsArray } from "../../../shared";
import { actionTypes } from "../../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";

function PageThree({ changePage, show }) {
  const { page3 : inputs } = useSelector((state) => state.authReducer.signInInputs);
  const dispatch = useDispatch();
  const checkedRef = inputs[0].value || 1;
  const refs = React.useRef([]);

  function onButtonClick(action) {
    if (action === "Back") {
      changePage(action);
    } else if (action === "Next") {
      if (parseInt(inputs[0].value) === 2)
        for (let i = 1; i < inputs.length; i++) {
          if (inputs[i].error.length > 0 || inputs[i].value.length === 0) {
            refs.current[i - 1].focus();
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
      page: "page3"
    });
  }

  return (
    <div className={`signup_wrapper_page${show ? " show" : ""}`}>
      <p style={{ marginTop: "10px", fontSize: "19px" }}>
        Are you looking for Jobs?
      </p>
      <br />
      <div className="form_input_wrapper">
        {pageInputs.page3.map((input, i) => {
          return (
            <Input
              key={i}
              inputType={input.type}
              name={input.name}
              label={input.label}
              value={input.value}
              checked={parseInt(checkedRef) - 1 !== i}
              updateInput={onInputChange}
            ></Input>
          );
        })}
      </div>
      {pageSelects.page3.map((input, i) => {
        return (
          <div
            data-test="select_wrapper"
            className={`form_select_wrapper${
              parseInt(checkedRef) === 2 ? " show" : ""
            }`}
            key={i}
          >
            <Input
              inputType={input.type}
              key={input.name}
              addToRefsArray={(el) => addToRefsArray(el, refs)}
              name={input.name}
              label={input.label}
              validations={input.validations}
              options={input.options}
              updateInput={onInputChange}
            />
          </div>
        );
      })}
        <Buttons buttons={pageButtons.page3} onClick={onButtonClick} className="form_buttons_wrapper"/>
    </div>
  );
}
export default PageThree;

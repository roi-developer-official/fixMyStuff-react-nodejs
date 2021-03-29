import React from "react";
import { Input, Button } from "../../Global_UI";
import { buttons as pageButtons, inputs as pageInputs } from "./elements";
import pagesReducer, { SET_INPUT, addToRefsArray } from "./pagesShared";

const initialState = {
  inputs: [
    { name: "email", value: "", error: "" },
    { name: "password", value: "", error: "" },
    { name: "confirmPassword", value: "", error: "" },
  ],
};
function PageFour({ changePage, show }) {
  const [state, dispatch] = React.useReducer(pagesReducer, initialState);
  const refs = React.useRef([]);

  function onButtonClick(action) {
    if (action === "Back") {
      changePage(action);
    } else if (action === "Done") {
      for (let i = 0; i < state.inputs.length; i++) {
        if (
          state.inputs[i].error.length > 0 ||
          state.inputs[i].value.length === 0
        ) {
          refs.current[i].focus();
          return;
        }
      }
      changePage(action, state.inputs);
    }
  }

  function onInputChange(name, value, error) {
    dispatch({ type: SET_INPUT, name: name, value: value, error: error });
  }

  return (
    <div className={`signup_wrapper_page ${show ? "show" : ""}`}>
      {pageInputs.page4.map((input, i) => {
        return (
          <div key={i} className="form_input_wrapper">
            <Input
              label={input.label}
              addToRefsArray={(el) => addToRefsArray(el, refs)}
              name={input.name}
              updateInput={onInputChange}
              type={input.type}
              validations={input.validations}
            ></Input>
          </div>
        );
      })}
      <div className="form_buttons_wrapper">
        {pageButtons.page4.map((btn, i) => {
          return (
            <Button
              key={i}
              label={btn.label}
              onClick={() => onButtonClick(btn.label)}
              style={btn.style}
            ></Button>
          );
        })}
      </div>
    </div>
  );
}
export default PageFour;

import React, { useEffect, useRef } from "react";
import { Input, Button } from "../../Global_UI";
import { validation } from "../../validations/Validations";
import { inputs as pageInputs, buttons as pageButtons, selects as pageSelects, inputs } from "./elements";

const SET_INPUT = "SET_INPUT";
const SET_INPUT_ERROR = "SET_INPUT_ERROR";

const initialState = {
  inputs: [
    { name: "role", value: 1 },
    { name: "profession", value: "", error: "" },
    { name: "experience", value: "", error: "" },
  ],
};

function reducer(state = initialState, action) {
  const updatedInput = state.inputs.slice();
  const index = updatedInput.findIndex((input) => input.name === action.name);
  switch (action.type) {
    case SET_INPUT:
      updatedInput[index].value = action.value;
      return {
        ...state,
        inputs: updatedInput,
      };
    case SET_INPUT_ERROR:
      updatedInput[index].error = action.error;
      return {
        ...state,
        inputs: updatedInput,
      };
    default: return state;
  }
}

function PageThree({ changePage, show }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const checkedRef = state.inputs[0].value || 1;

  //   function onButtonClick(action) {
  //     if (action === "Next" && validateInputs()) {
  //       let output = [];
  //       output.push({ ...userSelction });
  //       selectInputs.map((sel) => output.push({ ...sel }));
  //       changePage(action, output);
  //     } else if (action === "Back") {
  //       changePage(action);
  //     }
  //   }

  function onInputChange(name, value) {
        dispatch({ type: SET_INPUT, name, value });
  }

  function onErrorChange(name, error) {
    dispatch({ type: SET_INPUT_ERROR, name, error });
  }

  
  return (
    <div className={`signup_wrapper_page ${show ? "show" : ""}`}>
      <p style={{ marginTop: "10px", fontSize: "19px" }}>
        Are you looking for Jobs?
      </p>
      <br />
      <div className="form_input_wrapper">
        {pageInputs.page3.map((input, i) => {
          return (
            <Input
              key={i}
              type={input.type}
              name={input.name}
              label={input.label}
              value={input.value}
              checked={(checkedRef - 1) !== i}
              updateInput={onInputChange}
            ></Input>
          );
        })}
      </div>
      {pageSelects.page3.map((input ,i) => {
          return (
            <div className={`form_select_wrapper ${checkedRef === 2? 'show' : ''}`} key={i}>
              <Input
                inputType={input.type}
                key={input.name}
                name={input.name}
                label={input.label}
                validate={input.validate}
                validations={input.validations}
                options={input.options}
                onInputChange={onInputChange}
                onErrorChange={onErrorChange}
              />
            </div>
          );
        })}
      {/* <div className="form_buttons_wrapper">
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              label={btn.label}
              onClick={() => onButtonClick(btn.label)}
              style={btn.style}
            ></Button>
          );
        })}
      </div> */}
    </div>
  );
}
export default PageThree;

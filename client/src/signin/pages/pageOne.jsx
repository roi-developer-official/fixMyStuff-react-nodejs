import { Button, Input, Logo } from "../../Global_UI";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  buttons as pageButtons,
  inputs as pageInputs,
  selects as pageSelects,
  citiesString
} from "./elements";

const SET_INPUT = "SET_INPUT";
const SET_INPUT_ERROR = "SET_INPUT_ERROR";
const initialState = {
  inputs: [
    { name: "firstName", value: "", error: "" },
    { name: "lastName", value: "", error: "" },
    { name: "city", value: "", error: "" },
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
    default:
  }
}

function PageOne({ changePage, show }) {
  const cities = citiesString.split(",");
  const history = useHistory();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function onButtonClick(action) {
    let isInvalidPage = false;

    if (action === "Cancel") {
      history.push("/");
    } else if (action === "Next") {
      isInvalidPage = state.inputs.find(
        (input) => input.error.length > 0 || input.value.length === 0
      );
      if (isInvalidPage) {
        return;
      } else {
        changePage(action, state.inputs);
      }
    }
  }
  function onInputChange(name, value) {
    dispatch({ type: SET_INPUT, name: name, value: value });
  }

  function onErrorChange(name, error) {
    dispatch({ type: SET_INPUT_ERROR, name: name, error: error });
  }

  return (
    <div className={`signup_wrapper_page ${show ? "show" : ""}`}>
      <div className="logo_header">
        <Logo></Logo>
      </div>
      {pageInputs.page1.map((input, i) => {
        return (
          <div key={i} className="form_input_wrapper">
            <Input
              inputType="text"
              label={input.label}
              type={input.type}
              name={input.name}
              updateInput={onInputChange}
              updateError={onErrorChange}
              validate={input.validate}
              validations={input.validations}
            ></Input>
          </div>
        );
      })}
      {pageSelects.page1.map((input) => {
        return (
          <div key={input.name} className="form_select_wrapper">
            <Input
              inputType="select"
              label={input.label}
              validate={input.validate}
              validations={input.validations}
              name={input.name}
              options={cities}
              updateInput={onInputChange}
              updateError={onErrorChange}
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

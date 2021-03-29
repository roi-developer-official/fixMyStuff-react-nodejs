import { Button, Input, Logo } from "../../Global_UI";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  buttons as pageButtons,
  inputs as pageInputs,
  selects as pageSelects,
  citiesString
} from "./elements";

const SET_INPUT = "SET_INPUT";
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
  const refs = useRef([]);
    
  function addToRefsArray(el){
    if(!refs.current.includes(el))
      refs.current.push(el);
  }

  function onButtonClick(action) {
    if (action === "Cancel") {
      history.push("/");
    } else if (action === "Next") {
      for(let i = 0 ; i < state.inputs.length; i++){
        if(state.inputs[i].error.length > 0 || state.inputs[i].value.length === 0) {
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
      <div className="logo_header">
        <Logo></Logo>
      </div>
      {pageInputs.page1.map((input, i) => {
        return (
          <div key={i} className="form_input_wrapper">
            <Input
              ref={refs[i]}
              inputType={input.type}
              label={input.label}
              type={input.type}
              name={input.name}
              updateInput={onInputChange}
              addToRefsArray={addToRefsArray}
              validate={input.validate}
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
              validate={input.validate}
              validations={input.validations}
              name={input.name}
              options={cities}
              updateInput={onInputChange}
              addToRefsArray={addToRefsArray}
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

import React, { useRef } from "react";
import { useHistory } from "react-router";
import { Input, Button } from "../../Global_UI";
import { inputs as pageInputs, buttons as pageButtons, selects as pageSelects } from "./elements";

const SET_INPUT = "SET_INPUT";
const initialState = {
  inputs: [
    { name: "role", value: 1, error : "" },
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
  const history = useHistory();
  const checkedRef = state.inputs[0].value || 1;

  const refs = React.useRef([]);
    
  function addToRefsArray(el){
    if(!refs.current.includes(el))
      refs.current.push(el);
  }

  function onButtonClick(action) {
    let isInvalidPage = false;
    if (action === "Back") {
      history.push("/");
    } else if (action === "Next") {
        if(parseInt(state.inputs[0].value) === 2)
            state.inputs.forEach((input,index)=>{
                if(input.error.length > 0 || input.value.length === 0){
                refs.current[index].focus();
                isInvalidPage = true
                } 
        })
      if (isInvalidPage) {
        return;
      } else {
        changePage(action, state.inputs);
      }
    }
  }

  function onInputChange(name, value,error) {
        dispatch({ type: SET_INPUT, name: name, value: value, error: error });
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
              checked={(parseInt(checkedRef)- 1) !== i}
              updateInput={onInputChange}
            ></Input>
          );
        })}
      </div>
      {pageSelects.page3.map((input ,i) => {
          return (
            <div data-test="select_wrapper" className={`form_select_wrapper${parseInt(checkedRef) === 2? ' show' : ''}`} key={i}>
              <Input
                inputType={input.type}
                key={input.name}
                addToRefsArray={addToRefsArray}
                name={input.name}
                label={input.label}
                validate={input.validate}
                validations={input.validations}
                options={input.options}
                updateInput={onInputChange}
              />
            </div>
          );
        })}
      <div className="form_buttons_wrapper">
        {pageButtons.page3.map((btn, i) => {
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
export default PageThree;

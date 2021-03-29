import React from "react";
import { useHistory } from "react-router";
import { Input, Button } from "../../Global_UI";
import { inputs as pageInputs, buttons as pageButtons, selects as pageSelects } from "./elements";
import pagesReducer, {SET_INPUT, addToRefsArray} from "./pagesShared";

const initialState = {
  inputs: [
    { name: "role", value: 1, error : "" },
    { name: "profession", value: "", error: "" },
    { name: "experience", value: "", error: "" },
  ],
};

function PageThree({ changePage, show }) {
  const [state, dispatch] = React.useReducer(pagesReducer, initialState);
  const history = useHistory();
  const checkedRef = state.inputs[0].value || 1;
  const refs = React.useRef([]);
    
  function onButtonClick(action) {
    if (action === "Back") {
      changePage(action);
    } else if (action === "Next") {
        if(parseInt(state.inputs[0].value) === 2)
            for(let i = 1 ; i < state.inputs.length; i++){
                if(state.inputs[i].error.length > 0 || state.inputs[i].value.length === 0) {
                refs.current[i - 1].focus();
                return;
                }
            }
      changePage(action, state.inputs);
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
                addToRefsArray={(el)=>addToRefsArray(el,refs)}
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

import React, {useEffect, useRef} from "react";
import { Input, Buttons } from "../../../Global_UI";
import { buttons as pageButtons, inputs as pageInputs } from "./elements";
import { addToRefsArray} from "../../../shared/";
import { actionTypes } from '../../../actions/authAction';
import { useDispatch, useSelector} from 'react-redux';

function PageFour({ changePage, show }) {
  const { page4 : inputs } = useSelector((state) => state.authReducer.signInInputs);
  const dispatch = useDispatch();
  const refs = useRef([]);

  function onButtonClick(action) {
    if (action === "Back") {
      changePage(action);
    } else if (action === "Done") {
      for (let i = 0; i < inputs.length; i++) {
        if (
          inputs[i].error.length > 0 ||
          inputs[i].value.length === 0
        ) {
          refs.current[i].focus();
          return;
        }
      }
      changePage(action);
    }
  }

  function onInputChange(name, value, error) {
    dispatch({ type: actionTypes.AUTH_SIGN_SET_INPUT, name: name, value: value, error: error, page: "page4" });
  }

  function termsLabelHoverdAndClicked(e){
    console.log("this is a fake site");
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
              inputType={input.type}
              validations={input.validations}
              matchWith={inputs[1].value}
              popover={input.popover}
              popOverMessage={input.popoverMessage}
            ></Input>
          </div>
        );
      })}
      <Buttons buttons={pageButtons.page4} className="form_buttons_wrapper" onClick={onButtonClick}/>
    </div>
  );
}
export default PageFour;

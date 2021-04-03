import React, {useRef} from "react";
import { Input, Button } from "../../../Global_UI";
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
    dispatch({ type: actionTypes.SIGN_SET_INPUT, name: name, value: value, error: error, page: "page4" });
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

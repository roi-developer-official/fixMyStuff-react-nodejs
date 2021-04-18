import { buttons as pageButtons } from "./elements";
import { actionTypes } from "../actions/postAction";
import { addToRefsArray } from "../shared";
import { Textarea, Logo, Inputs, Buttons, FormPage } from "../Global_UI";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function PageOne({ show, changePage, inputs }) {
  const history = useHistory();
  const refs = useRef([]);
  const textInputs = inputs.slice(0, 2);
  const textArea = inputs.slice(2, 3)[0];
  const dispatch = useDispatch();
  function onInputChange(name, value, error) {
    dispatch({ type: actionTypes.POST_ADD_SET_INPUT, name, value, error });
  }

  function onButtonClicked(label) {
    
    if (label === "Cancel") history.push("/My-page");
    else {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].error.length > 0) {
          refs.current[i].focus();
          return;
        }
      }
      changePage(label);
    }
  }

  return (
    <FormPage show={show}>
      <div className="logo_header">
        <Logo></Logo>
      </div>
      <Inputs
        inputs={textInputs}
        onChange={onInputChange}
        refs={refs}
        className="form_input_wrapper"
      />
      <Textarea
        key={textArea.name}
        label={textArea.label}
        rows={textArea.rows}
        cols={textArea.cols}
        updateInput={onInputChange}
        value={textArea.value}
        name={textArea.name}
        addToRefsArray={(el) => addToRefsArray(el, refs)}
        validations={textArea.validations}
      ></Textarea>
      <Buttons
        buttons={pageButtons.page1}
        onClick={onButtonClicked}
        className="form_buttons_wrapper"
      />
    </FormPage>
  );
}

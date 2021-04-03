import {
  buttons as pageButtons,
  inputs as pageInputs,
  textAreas as pageTextAreas,
} from "../elements";
import { actionTypes } from "../../../actions/postAction";
import { addToRefsArray } from "../../../shared";
import { Input, Button, Textarea, Logo } from "../../../Global_UI";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PageOne({ show, changePage }) {
  const history = useHistory();
  const refs = useRef([]);
  const { page1: inputs } = useSelector(
    (state) => state.postReducer.addPostInputs
  );
  const dispatch = useDispatch();
  
  function onInputChange(name, value, error) {
    dispatch({ type: actionTypes.ADD_POST_SET_INPUT, name, value, error });
  }

  function onButtonClicked(label) {
    if (label === "Cancel") history.push("/My-page");
    else {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].error.length > 0 || inputs[i].value.length === 0) {
          refs.current[i].focus();
          return;
        }
      }
      changePage(label);
    }
  }

  return (
    <div className={`add_post_page${show ? " show" : ""}`}>
      <div className="logo_header">
        <Logo></Logo>
      </div>
      {pageInputs.page1.map((input, i) => (
        <div key={i} className="form_input_wrapper">
          <Input
            type={input.type}
            label={input.label}
            updateInput={onInputChange}
            name={input.name}
            style={input.style}
            validations={input.validations}
            addToRefsArray={(el) => addToRefsArray(el, refs)}
          ></Input>
        </div>
      ))}
      {pageTextAreas.page1.map((ta) => (
        <Textarea
          key={ta.name}
          label={ta.label}
          rows={ta.rows}
          cols={ta.cols}
          updateInput={onInputChange}
          name={ta.name}
          addToRefsArray={(el) => addToRefsArray(el, refs)}
          validations={ta.validations}
        ></Textarea>
      ))}
      <div className="form_buttons_wrapper">
        {pageButtons.page1.map((btn) => {
          return (
            <Button
              key={btn.label}
              label={btn.label}
              onClick={onButtonClicked}
              style={btn.style}
            />
          );
        })}
      </div>
    </div>
  );
}

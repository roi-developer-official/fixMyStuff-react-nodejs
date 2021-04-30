import React from "react";
import { Buttons, FormPage, Inputs } from "../../Global_UI";
import { buttons as pageButtons } from "./elements";
import { actionTypes } from "../../actions/authAction";
import { useDispatch } from "react-redux";

function PageThree({ changePage, show, inputs }) {
  const dispatch = useDispatch();
  const refs = React.useRef([]);

  function onButtonClick(action) {
    if (action === "Back") {
      changePage(action);
    } else if (action === "Next") {
      let selectedRoleInput = inputs.find(
        (input) => input.name === "selectedRole"
      );
      switch (selectedRoleInput.value) {
        case "":
          return;
        case 1:
          let isValid = true;
          for (let i = 4; i < inputs.length; i++) {
            if (inputs[i].error.length > 0 || inputs[i].value.length === 0) {
              isValid = false;
              refs.current[i - 1].focus();
              return;
            }
          }
          if (isValid) {
            changePage(action);
          }
          break;
        case 2:
          changePage(action);
          break;
        default:
      }
    }
  }


  function onInputChange(name, value, error) {
    dispatch({
      type: actionTypes.AUTH_SIGN_SET_INPUT,
      name: name,
      value: value,
      error: error,
    });
  }

  return (
    <FormPage show={show}>
      <p style={{ marginTop: "10px", fontSize: "19px" }}>
        Are you looking for Jobs?
      </p>
      <br />
      <Inputs
        inputs={inputs}
        onChange={onInputChange}
        refs={refs}
        className="form_input_wrapper"
      />
      <Buttons
        buttons={pageButtons.page3}
        onClick={onButtonClick}
        className="form_buttons_wrapper"
      />
    </FormPage>
  );
}
export default PageThree;

import React, { useRef ,useState} from "react";
import { Input, Buttons, FormPage } from "../../Global_UI";
import { buttons as pageButtons, inputs as pageInputs } from "./elements";
import { addToRefsArray, validation } from "../../shared/";
import { actionTypes } from "../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";

function PageFour({ changePage, show }) {
  const { page4: inputs } = useSelector(
    (state) => state.authReducer.signInInputs
  );
  const dispatch = useDispatch();
  const [isConfirmPassTouched, setIsConfirmPassTouched] = useState(false);
  const refs = useRef([]);
 
  function onButtonClick(action) {
    if (action === "Back") {
      changePage(action);
    } else if (action === "Done") {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].error.length > 0 || inputs[i].value.length === 0) {
          refs.current[i].focus();
          return;
        }
      }
      changePage(action);
    }
  }

  function updateComfirmPswdOnPswdChange(value) {
    if (!isConfirmPassTouched) return;
    const conPswd = inputs.find((input) => input.name === "confirmPassword");
    let errorMsg = validation(
      {
        compareTo: true,
      },
      conPswd.value,
      value
    );
    dispatch({
      type: actionTypes.AUTH_SIGN_SET_INPUT,
      name: conPswd.name,
      value: conPswd.value,
      error: errorMsg,
      page: "page4",
    });
  }

  function onInputChange(name, value, error) {
    dispatch({
      type: actionTypes.AUTH_SIGN_SET_INPUT,
      name: name,
      value: value,
      error: error,
      page: "page4",
    });
    if (name === "password") {
      updateComfirmPswdOnPswdChange(value);
    }
    else if (name === "confirmPassword" && !isConfirmPassTouched) {
      setIsConfirmPassTouched(true);
    } 

  }

  return (
    <FormPage show={show}>
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
              error={inputs[i].error}
            ></Input>
          </div>
        );
      })}
      <Buttons
        buttons={pageButtons.page4}
        className="form_buttons_wrapper"
        onClick={onButtonClick}
      />
    </FormPage>
  );
}
export default PageFour;

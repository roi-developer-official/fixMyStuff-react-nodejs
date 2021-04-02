import { useEffect, useReducer, useRef } from "react";
import { Input, Button, Logo, FormFeedback, LoadingSpinner } from "../../Global_UI";
import { login, actionTypes as authActions } from "../../actions/authAction";
import "./login.css";
import { useHistory, NavLink } from "react-router-dom";
import { buttons as pageButtons , inputs as pageInputs} from './elements';
import { useDispatch, useSelector } from "react-redux";
import {returnFormData} from '../../shared/functions';
import { addToRefsArray} from "../../shared/functions";
import { pagesReducer, actionTypes } from '../../shared/useReducers/pagesReducer';
const initialState = {
  inputs: [
    { name: "email", value: "", error: "" },
    { name: "password", value: "", error: "" },
  ],
};

function LoginPage() {
  const history = useHistory();
  const [state, dispatch] = useReducer(pagesReducer, initialState);
  const { error, loading, success } = useSelector((state) => state.authReducer);
  const storeDispatch = useDispatch();
  const refs  =  useRef([]);

  useEffect(() => {
    storeDispatch({type: authActions.RESET_STATE});
  }, [storeDispatch]);

  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        history.push("/")
      },700);
    }
  },[success, history]);

  function onInputChange(name, value, error) {
    dispatch({ type: actionTypes.SET_INPUT, name: name, value: value, error: error });
  }

  function onButtonClick(label) {
    if (label === "Login") {
      for(let i = 0 ; i < state.inputs.length; i++){
        if(state.inputs[i].error.length > 0 || state.inputs[i].value.length === 0) {
          refs.current[i].focus();
          return;
        }
      }
      submitPage(state.inputs);
    }
    else
      history.push("/");
    }

  function submitPage(inputs) {
    const reqData = returnFormData(inputs);
    storeDispatch({type: authActions.ACTION_START});
    storeDispatch(login(reqData));
  }

  return (
    <div className="login_page_container">
      <FormFeedback error={error} message={success ? "Login Successfuly!" : "Login Failed!"} success={success}/>
      <div className="login_wrapper_page">
        <div className="login_header">
        <LoadingSpinner show={loading}/>
          <Logo></Logo>
          <p>
            not signed in yet? <NavLink to="/Sign-in">signup</NavLink> now!
          </p>
        </div>
        {pageInputs.map((input) => {
          return (
            <div key={input.label} className="form_input_wrapper">
              <Input
                inputType={input.type}
                label={input.label}
                name={input.name}
                updateInput={onInputChange}
                validations={input.validations}
                addToRefsArray={(el)=>addToRefsArray(el,refs)}
              ></Input>
            </div>
          );
        })}
        <div className="form_buttons_wrapper">
          {pageButtons.map((btn) => {
            return (
              <Button
                key={btn.label}
                label={btn.label}
                style={btn.style}
                type={"button"}
                onClick={() => onButtonClick(btn.label)}
              ></Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
      


export default LoginPage;

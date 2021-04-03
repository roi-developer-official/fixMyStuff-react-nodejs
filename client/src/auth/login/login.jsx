import { useEffect, useRef } from "react";
import { Input, Button, Logo, FormFeedback, LoadingSpinner } from "../../Global_UI";
import { login , actionTypes} from "../../actions/authAction";
import "./login.css";
import { useHistory, NavLink } from "react-router-dom";
import { buttons as pageButtons , inputs as pageInputs} from './elements';
import { useDispatch, useSelector } from "react-redux";
import { addToRefsArray} from '../../shared';

function LoginPage() {
  const history = useHistory();
  const { error, loading, success, loginInputs: inputs } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const refs  =  useRef([]);

  useEffect(() => {
    dispatch({type: actionTypes.AUTH_RESET_STATE});
  }, [dispatch]);

  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        history.push("/")
      },700);
    }
  },[success, history]);

  function onInputChange(name, value, error) {
    dispatch({ type: actionTypes.AUTH_LOGIN_SET_INPUT, name: name, value: value, error: error });
  }

  function onButtonClick(label) {
    if (label === "Login") {
      for(let i = 0 ; i < inputs.length; i++){
        if(inputs[i].error.length > 0 || inputs[i].value.length === 0) {
          refs.current[i].focus();
          return;
        }
      }
    dispatch({type: actionTypes.AUTH_ACTION_START});
    dispatch(login());
    }
    else
      history.push("/");
    }

  return (
    <div className="login_page_container">
      <FormFeedback error={error} message={success ? "Login Successfuly!" : error} success={success}/>
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
